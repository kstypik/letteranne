from pathlib import Path

import environ

# 0. Setup


BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()

# Note: OS environment variables take precedence over variables from .env
env.read_env(str(BASE_DIR / ".env"))

ENVIRONMENT_TYPE = env("DJANGO_ENVIRONMENT_TYPE", default="prod")


# 1. Django Core Settings


ALLOWED_HOSTS = []

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

DATABASES = {"default": env.db("DATABASE_URL")}

DEBUG = env.bool("DJANGO_DEBUG", False)

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

INSTALLED_APPS = [
    # letteranne apps
    "apiserver.users",
    # sites framework has to be early
    # because some migrations from other apps depend on
    # those from this app
    "django.contrib.sites",
    # Third-party apps
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "debug_toolbar",
    "django_filters",
    "django_linear_migrations",
    "django_migration_linter",
    "django_version_checks",
    "django_watchfiles",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "drf_spectacular",
    "drf_standardized_errors",
    "rest_framework",
    "rest_framework.authtoken",
    # Django Contrib Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


# https://docs.djangoproject.com/en/5.0/ref/settings/#internal-ips
# See also: https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1"]

if DEBUG and ENVIRONMENT_TYPE == "dev":
    INTERNAL_IPS = type("c", (), {"__contains__": lambda *a: True})()

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
    },
    "formatters": {
        "rich": {"datefmt": "[%X]"},
    },
    "handlers": {
        "console": {
            "class": "rich.logging.RichHandler",
            "filters": ["require_debug_true"],
            "formatter": "rich",
            "level": "DEBUG",
            "rich_tracebacks": True,
            "tracebacks_show_locals": True,
        },
    },
    "loggers": {
        "django": {
            "handlers": [],
            "level": "INFO",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}

MEDIA_ROOT = BASE_DIR / "media"

MEDIA_URL = "media/"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "apiserver.urls"

SECRET_KEY = env("DJANGO_SECRET_KEY")

# https://docs.djangoproject.com/en/5.0/ref/settings/#std-setting-SITE_ID
# Required by django-allauth on which dj-rest-auth depends
SITE_ID = 1

STATICFILES_DIRS = [BASE_DIR / "static"]

STATIC_ROOT = BASE_DIR / "static-collected"

STATIC_URL = "static/"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

WSGI_APPLICATION = "apiserver.wsgi.application"


# 2. Django Contrib Settings


AUTH_USER_MODEL = "users.User"

DRF_STANDARDIZED_ERRORS = {
    "ENABLE_IN_DEBUG_FOR_UNHANDLED_EXCEPTIONS": env.bool(
        "DJANGO_ENABLE_API_RESPONSE_FOR_UNHANDLED_ERRORS", default=False
    )
}

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "jwtaccess",
    "JWT_AUTH_REFRESH_COOKIE": "jwtrefresh",
    "JWT_AUTH_HTTPONLY": True,
}

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_AUTHENTICATION_CLASSES": ["dj_rest_auth.jwt_auth.JWTCookieAuthentication"],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_standardized_errors.openapi.AutoSchema",
    "EXCEPTION_HANDLER": "drf_standardized_errors.handler.exception_handler",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "letteranne API",
    "DESCRIPTION": "Exchange e-letters with other people",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    # This will avoid multiple warnings raised by drf-spectacular due to the same set of error codes appearing in multiple operations.
    "ENUM_NAME_OVERRIDES": {
        "ValidationErrorEnum": "drf_standardized_errors.openapi_serializers.ValidationErrorEnum.choices",
        "ClientErrorEnum": "drf_standardized_errors.openapi_serializers.ClientErrorEnum.choices",
        "ServerErrorEnum": "drf_standardized_errors.openapi_serializers.ServerErrorEnum.choices",
        "ErrorCode401Enum": "drf_standardized_errors.openapi_serializers.ErrorCode401Enum.choices",
        "ErrorCode403Enum": "drf_standardized_errors.openapi_serializers.ErrorCode403Enum.choices",
        "ErrorCode404Enum": "drf_standardized_errors.openapi_serializers.ErrorCode404Enum.choices",
        "ErrorCode405Enum": "drf_standardized_errors.openapi_serializers.ErrorCode405Enum.choices",
        "ErrorCode406Enum": "drf_standardized_errors.openapi_serializers.ErrorCode406Enum.choices",
        "ErrorCode415Enum": "drf_standardized_errors.openapi_serializers.ErrorCode415Enum.choices",
        "ErrorCode429Enum": "drf_standardized_errors.openapi_serializers.ErrorCode429Enum.choices",
        "ErrorCode500Enum": "drf_standardized_errors.openapi_serializers.ErrorCode500Enum.choices",
    },
    "POSTPROCESSING_HOOKS": [
        "drf_standardized_errors.openapi_hooks.postprocess_schema_enums"
    ],
}


# 3. Third-party Apps Settings


VERSION_CHECKS = {
    "python": "==3.12.*",
    "postgresql": "~=16.2",
}
