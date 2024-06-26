from pathlib import Path

import django_stubs_ext
import environ

# 0. Setup


# Monkeypatching Django, so stubs will work for all generics
# https://github.com/typeddjango/django-stubs#i-cannot-use-queryset-or-manager-with-type-annotations
django_stubs_ext.monkeypatch()

BASE_DIR = Path(__file__).resolve().parent

env = environ.Env()

# Note: OS environment variables take precedence over variables from .env
env.read_env(str(BASE_DIR / ".env"))

ENVIRONMENT_TYPE = env("DJANGO_ENVIRONMENT_TYPE", default="prod")


# 1. Django Core Settings


ALLOWED_HOSTS: list[str] = []

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by email
    "allauth.account.auth_backends.AuthenticationBackend",
]

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
    "letteranne.letters",
    "letteranne.users",
    # Third-party apps
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "debug_toolbar",
    "django_browser_reload",
    "django_filters",
    "django_linear_migrations",
    "django_migration_linter",
    "django_version_checks",
    # "django_watchfiles", # currently unused because incompatibility with browser reload
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
    "django_browser_reload.middleware.BrowserReloadMiddleware",
]

ROOT_URLCONF = "letteranne.urls"

SECRET_KEY = env("DJANGO_SECRET_KEY")

STATICFILES_DIRS = [BASE_DIR / "static"]

STATIC_ROOT = BASE_DIR / "static-collected"

STATIC_URL = "static/"

default_loaders = [
    "django.template.loaders.filesystem.Loader",
    "django.template.loaders.app_directories.Loader",
]

cached_loaders = [("django.template.loaders.cached.Loader", default_loaders)]

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

WSGI_APPLICATION = "letteranne.wsgi.application"


# 2. Django Contrib Settings


AUTH_USER_MODEL = "users.User"


# 3. Third-party Apps Settings


# django-version-checks - https://github.com/adamchainz/django-version-checks
VERSION_CHECKS = {
    "python": "==3.12.*",
    "postgresql": "~=16.2",
}
