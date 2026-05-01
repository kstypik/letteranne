from django.http import JsonResponse


def error_response(message: str, status: int, code: str | None = None):
    payload = {"error": {"message": message}}
    if code:
        payload["error"]["code"] = code
    return JsonResponse(payload, status=status)

