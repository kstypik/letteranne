from django.utils import timezone

from .models import Letter, LetterStatus


def deliver_due_letters(now=None):
    now = now or timezone.now()
    due_letters = Letter.objects.filter(
        status=LetterStatus.QUEUED,
        scheduled_for__lte=now,
    )
    updated = 0
    for letter in due_letters:
        # Idempotency guard: only transition queued letters.
        if letter.status != LetterStatus.QUEUED:
            continue
        letter.status = LetterStatus.DELIVERED
        letter.delivered_at = now
        letter.save(update_fields=["status", "delivered_at", "updated_at"])
        updated += 1
    return updated

