from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoAuthUserAdmin

from apiserver.users import forms, models


@admin.register(models.User)
class UserAdmin(DjangoAuthUserAdmin):
    add_form = forms.UserCreation
    form = forms.UserChange

    list_display = ["username", "email", "is_active", "is_staff"]

    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Permissions",
            {"fields": ("is_staff", "is_active", "groups", "user_permissions")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )

    search_fields = (
        "username",
        "email",
    )
    ordering = ("username",)
