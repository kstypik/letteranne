from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from apps.common.errors import error_response


@csrf_exempt
@require_POST
def export_user_data(request):
    if not request.user.is_authenticated:
        return error_response("Authentication required", 401, "AUTH_REQUIRED")

    payload = {
        "user": {
            "id": str(request.user.id),
            "email": request.user.email,
            "username": request.user.username,
        },
        "status": "export_stub",
    }
    return JsonResponse(payload)


@csrf_exempt
@require_POST
def delete_account(request):
    if not request.user.is_authenticated:
        return error_response("Authentication required", 401, "AUTH_REQUIRED")

    request.user.is_active = False
    request.user.save(update_fields=["is_active"])
    return JsonResponse({"status": "deactivated"})

