from datetime import timedelta

import pytest
from django.contrib.auth import get_user_model
from django.utils import timezone

from apps.letters.models import Letter, LetterStatus, LetterVisibility
from apps.letters.services import deliver_due_letters

User = get_user_model()


@pytest.mark.django_db
def test_deliver_due_letters_transitions_only_due_queued_letters():
    sender = User.objects.create_user(username="scheduler@example.com", email="scheduler@example.com")
    recipient = User.objects.create_user(username="scheduler2@example.com", email="scheduler2@example.com")
    now = timezone.now()
    due = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Due",
        scheduled_for=now - timedelta(minutes=1),
    )
    future = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Future",
        scheduled_for=now + timedelta(minutes=20),
    )

    updated = deliver_due_letters(now=now)

    due.refresh_from_db()
    future.refresh_from_db()
    assert updated == 1
    assert due.status == LetterStatus.DELIVERED
    assert due.delivered_at is not None
    assert future.status == LetterStatus.QUEUED
    assert future.delivered_at is None


@pytest.mark.django_db
def test_deliver_due_letters_is_idempotent():
    sender = User.objects.create_user(username="scheduler3@example.com", email="scheduler3@example.com")
    recipient = User.objects.create_user(username="scheduler4@example.com", email="scheduler4@example.com")
    now = timezone.now()
    letter = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Idempotent",
        scheduled_for=now - timedelta(minutes=1),
    )

    first = deliver_due_letters(now=now)
    second = deliver_due_letters(now=now + timedelta(minutes=5))

    letter.refresh_from_db()
    assert first == 1
    assert second == 0
    assert letter.status == LetterStatus.DELIVERED

