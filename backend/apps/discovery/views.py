from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from apps.profiles.models import UserProfile

User = get_user_model()


def _serialize_user(user):
    profile = UserProfile.objects.filter(user=user).first()
    return {
        "id": str(user.id),
        "displayId": user.username,
        "bio": profile.bio if profile else None,
        "avatarUrl": profile.avatar_url if profile else None,
    }


@csrf_exempt
@require_http_methods(["GET"])
def user_by_display_id(request, display_id: str):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    try:
        user = User.objects.get(username=display_id)
    except User.DoesNotExist:
        return JsonResponse({"detail": "User not found"}, status=404)

    return JsonResponse(_serialize_user(user))


@csrf_exempt
@require_http_methods(["GET"])
def discover_users(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Authentication required"}, status=401)

    limit_raw = request.GET.get("limit", "10")
    try:
        limit = max(1, min(int(limit_raw), 50))
    except ValueError:
        limit = 10

    users = User.objects.exclude(id=request.user.id).order_by("?")[:limit]
    return JsonResponse({"users": [_serialize_user(user) for user in users]})

