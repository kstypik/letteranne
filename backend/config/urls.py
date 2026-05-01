from django.http import JsonResponse
from django.urls import path


def healthcheck(_request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("healthz", healthcheck, name="healthcheck"),
]

