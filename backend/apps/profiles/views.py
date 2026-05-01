import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from apps.common.errors import error_response

from .models import UserProfile


def _decode_json(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return {}


@csrf_exempt
@require_http_methods(["GET", "PATCH"])
def me(request):
    if not request.user.is_authenticated:
        return error_response("Authentication required", 401, "AUTH_REQUIRED")

    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    if request.method == "GET":
        return JsonResponse(
            {
                "email": request.user.email,
                "bio": profile.bio,
                "avatarUrl": profile.avatar_url,
            }
        )

    payload = _decode_json(request)
    bio = payload.get("bio", profile.bio)
    avatar_url = payload.get("avatarUrl", profile.avatar_url)

    if bio is not None and len(bio) > 1000:
        return error_response("Bio is too long", 400, "PROFILE_INVALID_BIO")
    if avatar_url is not None and avatar_url != "" and not str(avatar_url).startswith(("http://", "https://")):
        return error_response("avatarUrl must be a valid URL", 400, "PROFILE_INVALID_AVATAR")

    profile.bio = bio
    profile.avatar_url = avatar_url
    profile.save(update_fields=["bio", "avatar_url", "updated_at"])

    return JsonResponse(
        {
            "email": request.user.email,
            "bio": profile.bio,
            "avatarUrl": profile.avatar_url,
        }
    )

