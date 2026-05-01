import json
from uuid import UUID

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Postcard, UserPostcard
from .services import grant_postcard_to_user


def _serialize_user_postcard(item: UserPostcard):
    return {
        "id": str(item.id),
        "postcardId": str(item.postcard_id),
        "code": item.postcard.code,
        "title": item.postcard.title,
        "imageUrl": item.postcard.image_url,
        "unlockedBy": item.unlocked_by,
        "unlockedAt": item.unlocked_at.isoformat(),
    }


@csrf_exempt
@require_http_methods(["GET"])
def collection(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    owned = (
        UserPostcard.objects.select_related("postcard")
        .filter(user=request.user)
        .order_by("-unlocked_at")
    )
    return JsonResponse({"items": [_serialize_user_postcard(item) for item in owned]})


@csrf_exempt
@require_http_methods(["POST"])
def grant_reward(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        payload = {}

    postcard_id = payload.get("postcardId")
    if not postcard_id:
        return JsonResponse({"detail": "postcardId is required"}, status=400)

    try:
        postcard_uuid = UUID(postcard_id)
    except ValueError:
        return JsonResponse({"detail": "postcardId must be a valid UUID"}, status=400)

    try:
        postcard = Postcard.objects.get(id=postcard_uuid)
    except Postcard.DoesNotExist:
        return JsonResponse({"detail": "Postcard not found"}, status=404)

    ownership, created = grant_postcard_to_user(user=request.user, postcard=postcard)
    return JsonResponse(
        {"created": created, "item": _serialize_user_postcard(ownership)},
        status=201 if created else 200,
    )

