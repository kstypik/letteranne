import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from apps.common.errors import error_response
from apps.letters.models import Letter

from .models import ModerationReport


@csrf_exempt
@require_http_methods(["POST"])
def create_report(request):
    if not request.user.is_authenticated:
        return error_response("Authentication required", 401, "AUTH_REQUIRED")

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        payload = {}

    letter_id = payload.get("letterId")
    reason = (payload.get("reason") or "").strip()
    if not letter_id or not reason:
        return error_response("letterId and reason are required", 400, "MODERATION_INVALID_PAYLOAD")

    try:
        letter = Letter.objects.get(id=letter_id)
    except Letter.DoesNotExist:
        return error_response("Letter not found", 404, "LETTER_NOT_FOUND")

    report = ModerationReport.objects.create(
        reporter_user=request.user,
        letter=letter,
        reason=reason,
    )
    return JsonResponse({"id": str(report.id), "status": report.status}, status=201)

