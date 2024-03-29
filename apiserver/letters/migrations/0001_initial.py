# Generated by Django 5.0.2 on 2024-03-24 19:25

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Letter",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        db_index=True, default=django.utils.timezone.now
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=100, verbose_name="title")),
                ("body", models.TextField(verbose_name="body")),
                ("scheduled_at", models.DateTimeField(verbose_name="scheduled at")),
                (
                    "delivered_at",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="delivered at"
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="written_letters",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="author",
                    ),
                ),
                (
                    "recipient",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="received_letters",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="recipient",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
