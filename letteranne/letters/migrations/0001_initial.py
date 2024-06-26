# Generated by Django 5.0.2 on 2024-04-02 19:22

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

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
            ],
            options={
                "abstract": False,
            },
        ),
    ]
