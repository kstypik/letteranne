import uuid

from django.conf import settings
from django.db import models


class ModerationReportStatus(models.TextChoices):
    OPEN = "open", "Open"
    REVIEWED = "reviewed", "Reviewed"
    DISMISSED = "dismissed", "Dismissed"
    ACTIONED = "actioned", "Actioned"


class ModerationReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reporter_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reports_submitted"
    )
    letter = models.ForeignKey("letters.Letter", on_delete=models.CASCADE, related_name="moderation_reports")
    reason = models.TextField()
    status = models.CharField(
        max_length=32, choices=ModerationReportStatus.choices, default=ModerationReportStatus.OPEN
    )
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "moderation_report"
        indexes = [
            models.Index(fields=["status", "-created_at"], name="idx_mod_rpt_st_crt_at")
        ]

