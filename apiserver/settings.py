from pathlib import Path

import environ

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
    # Third-party apps
    "django_extensions",
    # Django Contrib Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "debug_toolbar",
]


# https://docs.djangoproject.com/en/5.0/ref/settings/#internal-ips
# See also: https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1"]

if DEBUG and ENVIRONMENT_TYPE == "dev":
    INTERNAL_IPS = type("c", (), {"__contains__": lambda *a: True})()

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
]

ROOT_URLCONF = "apiserver.urls"

SECRET_KEY = env("DJANGO_SECRET_KEY")

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
