import uuid

from django.conf import settings
from django.db import models
from django.db.models import Q


class LetterVisibility(models.TextChoices):
    PRIVATE = "private", "Private"
    OPEN = "open", "Open"


class LetterStatus(models.TextChoices):
    QUEUED = "queued", "Queued"
    DELIVERED = "delivered", "Delivered"
    HIDDEN_MODERATION = "hidden_moderation", "Hidden moderation"


class Letter(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_letters"
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="received_letters",
    )
    parent_letter = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, blank=True, related_name="replies"
    )
    visibility = models.CharField(max_length=16, choices=LetterVisibility.choices)
    status = models.CharField(max_length=32, choices=LetterStatus.choices, default=LetterStatus.QUEUED)
    subject = models.CharField(max_length=255, blank=True, null=True)
    body = models.TextField()
    scheduled_for = models.DateTimeField()
    delivered_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "letter"
        constraints = [
            models.CheckConstraint(
                condition=Q(visibility=LetterVisibility.OPEN) | Q(recipient__isnull=False),
                name="private_letter_requires_recipient",
            )
        ]
        indexes = [
            models.Index(fields=["sender", "-created_at"], name="idx_letter_sender_created_at"),
            models.Index(fields=["recipient", "-created_at"], name="idx_lttr_rcpt_crt_at"),
            models.Index(fields=["visibility", "-created_at"], name="idx_lttr_vis_crt_at"),
            models.Index(fields=["parent_letter"], name="idx_letter_parent_letter_id"),
        ]


class LetterPostcard(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    letter = models.OneToOneField(Letter, on_delete=models.CASCADE, related_name="attachment")
    user_postcard = models.ForeignKey(
        "postcards.UserPostcard", on_delete=models.PROTECT, related_name="letter_attachments"
    )
    attached_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "letter_postcard"

