from pathlib import Path

from django.http import HttpResponse, JsonResponse
from django.urls import path
from django.views.generic import RedirectView

from apps.auth.gdpr_views import delete_account, export_user_data
from apps.auth.views import login_view, logout_view, register
from apps.discovery.views import discover_users, user_by_display_id
from apps.letters.views import (
    attach_postcard,
    create_reply,
    get_letter,
    letters_collection,
    list_open_letters,
)
from apps.moderation.views import create_report as moderation_create_report
from apps.postcards.views import collection as postcards_collection
from apps.postcards.views import grant_reward as postcards_grant
from apps.profiles.views import me as profile_me


def healthcheck(_request):
    return JsonResponse({"status": "ok"})


def openapi_schema(_request):
    schema_path = (
        Path(__file__).resolve().parent.parent.parent / ".prodready" / "design" / "api" / "openapi.yaml"
    )
    if not schema_path.exists():
        return JsonResponse({"detail": "OpenAPI schema not found"}, status=404)

    return HttpResponse(schema_path.read_text(), content_type="application/yaml")


urlpatterns = [
    path("", RedirectView.as_view(pattern_name="healthcheck", permanent=False)),
    path("healthz", healthcheck, name="healthcheck"),
    path("openapi", openapi_schema, name="openapi-schema"),
    path("auth/register", register, name="auth-register"),
    path("auth/login", login_view, name="auth-login"),
    path("auth/logout", logout_view, name="auth-logout"),
    path("gdpr/export", export_user_data, name="gdpr-export"),
    path("gdpr/delete-account", delete_account, name="gdpr-delete-account"),
    path("profiles/me", profile_me, name="profile-me"),
    path("users/by-id/<str:display_id>", user_by_display_id, name="users-by-display-id"),
    path("users/discover", discover_users, name="users-discover"),
    path("postcards/collection", postcards_collection, name="postcards-collection"),
    path("postcards/grant", postcards_grant, name="postcards-grant"),
    path("moderation/reports", moderation_create_report, name="moderation-reports-create"),
    path("letters", letters_collection, name="letters-collection"),
    path("letters/open", list_open_letters, name="letters-open"),
    path("letters/<str:letter_id>/replies", create_reply, name="letters-replies"),
    path("letters/<str:letter_id>/postcard", attach_postcard, name="letters-attach-postcard"),
    path("letters/<str:letter_id>", get_letter, name="letters-detail"),
]

