from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.letters.services import deliver_due_letters


class Command(BaseCommand):
    help = "Deliver queued letters whose scheduled_for is due"

    def handle(self, *args, **options):
        now = timezone.now()
        retries = 2
        for attempt in range(retries + 1):
            try:
                updated = deliver_due_letters(now=now)
                self.stdout.write(self.style.SUCCESS(f"Delivered {updated} letters"))
                return
            except Exception as exc:
                self.stderr.write(
                    f"[delivery-task] attempt={attempt + 1}/{retries + 1} failed: {exc}"
                )
                if attempt == retries:
                    raise

