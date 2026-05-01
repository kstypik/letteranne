import uuid

from django.conf import settings
from django.db import models


class PostcardSourceType(models.TextChoices):
    ACHIEVEMENT = "achievement", "Achievement"
    EVENT = "event", "Event"


class PostcardUnlockSource(models.TextChoices):
    ACHIEVEMENT = "achievement", "Achievement"
    EVENT = "event", "Event"
    ADMIN_GRANT = "admin_grant", "Admin grant"


class Postcard(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=64, unique=True)
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    source_type = models.CharField(max_length=32, choices=PostcardSourceType.choices)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "postcard"


class UserPostcard(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="owned_postcards")
    postcard = models.ForeignKey(Postcard, on_delete=models.CASCADE, related_name="owners")
    unlocked_by = models.CharField(max_length=32, choices=PostcardUnlockSource.choices)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "user_postcard"
        indexes = [
            models.Index(fields=["user", "-unlocked_at"], name="idx_user_postcard_user_unlocked_at")
        ]
        constraints = [
            models.UniqueConstraint(fields=["user", "postcard"], name="uniq_user_postcard_pair")
        ]

