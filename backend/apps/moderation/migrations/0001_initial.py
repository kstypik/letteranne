import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("letters", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ModerationReport",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("reason", models.TextField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("open", "Open"),
                            ("reviewed", "Reviewed"),
                            ("dismissed", "Dismissed"),
                            ("actioned", "Actioned"),
                        ],
                        default="open",
                        max_length=32,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("reviewed_at", models.DateTimeField(blank=True, null=True)),
                (
                    "letter",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="moderation_reports",
                        to="letters.letter",
                    ),
                ),
                (
                    "reporter_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reports_submitted",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "moderation_report",
                "indexes": [
                    models.Index(fields=["status", "-created_at"], name="idx_moderation_report_status_created_at")
                ],
            },
        ),
    ]

