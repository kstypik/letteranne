from django.contrib import admin

from letteranne.letters import models


@admin.register(models.Letter)
class LetterAdmin(admin.ModelAdmin):
    date_hierarchy = "scheduled_at"
    list_display = ["title", "author", "scheduled_at", "delivered_at"]
    list_filter = ["scheduled_at", "delivered_at"]
    search_fields = ["title", "body"]
