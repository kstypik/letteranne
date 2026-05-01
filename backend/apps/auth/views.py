import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


User = get_user_model()


def _json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return {}


@csrf_exempt
@require_POST
def register(request):
    payload = _json_body(request)
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    if not email or not password:
        return JsonResponse({"detail": "Email and password are required"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"detail": "Email already exists"}, status=409)

    user = User.objects.create_user(username=email, email=email, password=password)
    login(request, user)
    return JsonResponse({"email": user.email}, status=201)


@csrf_exempt
@require_POST
def login_view(request):
    payload = _json_body(request)
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    user = authenticate(request, username=email, password=password)
    if user is None:
        return JsonResponse({"detail": "Invalid credentials"}, status=401)

    login(request, user)
    return JsonResponse({"detail": "Logged in"})


@csrf_exempt
@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"detail": "Logged out"})

