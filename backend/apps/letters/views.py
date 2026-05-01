import json
from datetime import datetime

from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Letter, LetterStatus, LetterVisibility

User = get_user_model()


def _decode_json(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return {}


def _serialize_letter(letter: Letter):
    postcard = getattr(letter, "attachment", None)
    return {
        "id": str(letter.id),
        "senderId": str(letter.sender_id),
        "recipientId": str(letter.recipient_id) if letter.recipient_id else None,
        "visibility": letter.visibility,
        "status": letter.status,
        "subject": letter.subject,
        "body": letter.body,
        "scheduledFor": letter.scheduled_for.isoformat(),
        "deliveredAt": letter.delivered_at.isoformat() if letter.delivered_at else None,
        "postcard": (
            {
                "title": postcard.user_postcard.postcard.title,
                "imageUrl": postcard.user_postcard.postcard.image_url,
            }
            if postcard
            else None
        ),
    }


def _parse_int(value: str | None, default: int, minimum: int, maximum: int) -> int:
    try:
        parsed = int(value or default)
    except (TypeError, ValueError):
        return default
    return max(minimum, min(parsed, maximum))


@csrf_exempt
@require_http_methods(["POST"])
def create_letter(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    payload = _decode_json(request)
    body = (payload.get("body") or "").strip()
    subject = payload.get("subject")
    scheduled_for_raw = payload.get("scheduledFor")
    recipient_id = payload.get("recipientId")
    visibility = payload.get("visibility", LetterVisibility.PRIVATE)

    if not body:
        return JsonResponse({"detail": "Body is required"}, status=400)
    recipient = None
    if visibility == LetterVisibility.PRIVATE:
        if not recipient_id:
            return JsonResponse({"detail": "recipientId is required for private letters"}, status=400)
        try:
            recipient = User.objects.get(id=recipient_id)
        except User.DoesNotExist:
            return JsonResponse({"detail": "Recipient not found"}, status=404)
    elif visibility != LetterVisibility.OPEN:
        return JsonResponse({"detail": "visibility must be private or open"}, status=400)

    scheduled_for = timezone.now()
    if scheduled_for_raw:
        try:
            scheduled_for = datetime.fromisoformat(scheduled_for_raw.replace("Z", "+00:00"))
        except ValueError:
            return JsonResponse({"detail": "scheduledFor must be an ISO datetime"}, status=400)

    letter = Letter.objects.create(
        sender=request.user,
        recipient=recipient,
        visibility=visibility,
        status=LetterStatus.QUEUED,
        subject=subject,
        body=body,
        scheduled_for=scheduled_for,
    )
    return JsonResponse(_serialize_letter(letter), status=201)


def list_letters(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    page = _parse_int(request.GET.get("page"), default=1, minimum=1, maximum=10_000)
    limit = _parse_int(request.GET.get("limit"), default=20, minimum=1, maximum=100)
    visibility = request.GET.get("visibility")

    queryset = Letter.objects.filter(sender=request.user) | Letter.objects.filter(recipient=request.user)
    if visibility in [LetterVisibility.PRIVATE, LetterVisibility.OPEN]:
        queryset = queryset.filter(visibility=visibility)

    queryset = queryset.order_by("-updated_at", "-created_at")
    paginator = Paginator(queryset, limit)
    page_obj = paginator.get_page(page)

    return JsonResponse(
        {
            "results": [_serialize_letter(letter) for letter in page_obj.object_list],
            "page": page_obj.number,
            "limit": limit,
            "total": paginator.count,
        }
    )


@csrf_exempt
@require_http_methods(["GET", "POST"])
def letters_collection(request):
    if request.method == "GET":
        return list_letters(request)
    return create_letter(request)


@csrf_exempt
@require_http_methods(["GET"])
def list_open_letters(request):
    page = _parse_int(request.GET.get("page"), default=1, minimum=1, maximum=10_000)
    limit = _parse_int(request.GET.get("limit"), default=20, minimum=1, maximum=100)
    queryset = Letter.objects.filter(
        visibility=LetterVisibility.OPEN, parent_letter__isnull=True
    ).order_by("-updated_at", "-created_at")
    paginator = Paginator(queryset, limit)
    page_obj = paginator.get_page(page)

    return JsonResponse(
        {
            "results": [_serialize_letter(letter) for letter in page_obj.object_list],
            "page": page_obj.number,
            "limit": limit,
            "total": paginator.count,
        }
    )


@csrf_exempt
@require_http_methods(["POST"])
def create_reply(request, letter_id: str):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    try:
        parent_letter = Letter.objects.get(id=letter_id)
    except Letter.DoesNotExist:
        return JsonResponse({"detail": "Letter not found"}, status=404)

    if parent_letter.visibility != LetterVisibility.OPEN:
        return JsonResponse({"detail": "Replies are only allowed for open letters"}, status=400)

    payload = _decode_json(request)
    body = (payload.get("body") or "").strip()
    if not body:
        return JsonResponse({"detail": "Body is required"}, status=400)

    reply = Letter.objects.create(
        sender=request.user,
        recipient=None,
        parent_letter=parent_letter,
        visibility=LetterVisibility.OPEN,
        status=LetterStatus.QUEUED,
        subject=payload.get("subject"),
        body=body,
        scheduled_for=timezone.now(),
    )
    return JsonResponse(_serialize_letter(reply), status=201)


@csrf_exempt
@require_http_methods(["POST"])
def attach_postcard(request, letter_id: str):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    try:
        letter = Letter.objects.get(id=letter_id)
    except Letter.DoesNotExist:
        return JsonResponse({"detail": "Letter not found"}, status=404)

    if request.user.id not in [letter.sender_id, letter.recipient_id]:
        return JsonResponse({"detail": "Forbidden"}, status=403)

    try:
        payload = _decode_json(request)
    except Exception:
        payload = {}

    postcard_id = payload.get("userPostcardId")
    if not postcard_id:
        return JsonResponse({"detail": "userPostcardId is required"}, status=400)

    from apps.postcards.models import UserPostcard

    from .models import LetterPostcard

    try:
        user_postcard = UserPostcard.objects.get(id=postcard_id)
    except UserPostcard.DoesNotExist:
        return JsonResponse({"detail": "Postcard ownership not found"}, status=404)

    if user_postcard.user_id != request.user.id:
        return JsonResponse({"detail": "Forbidden"}, status=403)

    attachment, created = LetterPostcard.objects.get_or_create(
        letter=letter, defaults={"user_postcard": user_postcard}
    )
    if not created:
        attachment.user_postcard = user_postcard
        attachment.save(update_fields=["user_postcard"])

    return JsonResponse(
        {
            "letterId": str(letter.id),
            "userPostcardId": str(attachment.user_postcard_id),
            "attachedAt": attachment.attached_at.isoformat(),
        }
    )


@csrf_exempt
@require_http_methods(["GET"])
def get_letter(request, letter_id: str):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    try:
        letter = Letter.objects.get(id=letter_id)
    except Letter.DoesNotExist:
        return JsonResponse({"detail": "Letter not found"}, status=404)

    is_participant = request.user.id in [letter.sender_id, letter.recipient_id]
    if not is_participant:
        return JsonResponse({"detail": "Forbidden"}, status=403)

    return JsonResponse(_serialize_letter(letter))

