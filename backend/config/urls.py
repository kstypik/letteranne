from pathlib import Path

from django.http import HttpResponse, JsonResponse
from django.urls import path
from django.views.generic import RedirectView

from apps.auth.views import login_view, logout_view, register

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
]

