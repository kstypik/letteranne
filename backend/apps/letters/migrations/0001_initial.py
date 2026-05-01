import uuid

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("postcards", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Letter",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                (
                    "visibility",
                    models.CharField(
                        choices=[("private", "Private"), ("open", "Open")],
                        max_length=16,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("queued", "Queued"),
                            ("delivered", "Delivered"),
                            ("hidden_moderation", "Hidden moderation"),
                        ],
                        default="queued",
                        max_length=32,
                    ),
                ),
                ("subject", models.CharField(blank=True, max_length=255, null=True)),
                ("body", models.TextField()),
                ("scheduled_for", models.DateTimeField()),
                ("delivered_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "parent_letter",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="replies",
                        to="letters.letter",
                    ),
                ),
                (
                    "recipient",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="received_letters",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sent_letters",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "letter",
                "indexes": [
                    models.Index(fields=["sender", "-created_at"], name="idx_letter_sender_created_at"),
                    models.Index(fields=["recipient", "-created_at"], name="idx_letter_recipient_created_at"),
                    models.Index(fields=["visibility", "-created_at"], name="idx_letter_visibility_created_at"),
                    models.Index(fields=["parent_letter"], name="idx_letter_parent_letter_id"),
                ],
                "constraints": [
                    models.CheckConstraint(
                        condition=models.Q(visibility="open") | models.Q(recipient__isnull=False),
                        name="private_letter_requires_recipient",
                    )
                ],
            },
        ),
        migrations.CreateModel(
            name="LetterPostcard",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("attached_at", models.DateTimeField(auto_now_add=True)),
                (
                    "letter",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="attachment",
                        to="letters.letter",
                    ),
                ),
                (
                    "user_postcard",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="letter_attachments",
                        to="postcards.userpostcard",
                    ),
                ),
            ],
            options={"db_table": "letter_postcard"},
        ),
    ]

