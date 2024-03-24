from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import BaseModel


class Letter(BaseModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("author"),
        null=True,
        on_delete=models.SET_NULL,
        related_name="written_letters",
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=("recipient"),
        null=True,
        on_delete=models.SET_NULL,
        related_name="received_letters",
    )
    title = models.CharField(_("title"), max_length=100)
    body = models.TextField(_("body"))
    scheduled_at = models.DateTimeField(_("scheduled at"))
    delivered_at = models.DateTimeField("delivered at", null=True, blank=True)

    def __str__(self):
        return self.title
