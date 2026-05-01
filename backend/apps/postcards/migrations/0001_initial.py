import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Postcard",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("code", models.CharField(max_length=64, unique=True)),
                ("title", models.CharField(max_length=255)),
                ("image_url", models.URLField()),
                (
                    "source_type",
                    models.CharField(
                        choices=[("achievement", "Achievement"), ("event", "Event")], max_length=32
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"db_table": "postcard"},
        ),
        migrations.CreateModel(
            name="UserPostcard",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                (
                    "unlocked_by",
                    models.CharField(
                        choices=[
                            ("achievement", "Achievement"),
                            ("event", "Event"),
                            ("admin_grant", "Admin grant"),
                        ],
                        max_length=32,
                    ),
                ),
                ("unlocked_at", models.DateTimeField(auto_now_add=True)),
                (
                    "postcard",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="owners", to="postcards.postcard"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="owned_postcards",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "user_postcard",
                "indexes": [
                    models.Index(fields=["user", "-unlocked_at"], name="idx_user_postcard_user_unlocked_at")
                ],
                "constraints": [
                    models.UniqueConstraint(fields=("user", "postcard"), name="uniq_user_postcard_pair")
                ],
            },
        ),
    ]

