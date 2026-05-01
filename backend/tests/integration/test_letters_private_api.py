from datetime import timedelta

import pytest
from django.contrib.auth import get_user_model
from django.test import Client
from django.utils import timezone

from apps.letters.models import Letter, LetterStatus, LetterVisibility

User = get_user_model()


@pytest.mark.django_db
def test_post_letters_creates_private_queued_letter():
    sender = User.objects.create_user(username="sender@example.com", email="sender@example.com", password="pw")
    recipient = User.objects.create_user(
        username="recipient@example.com", email="recipient@example.com", password="pw"
    )
    client = Client()
    client.force_login(sender)
    scheduled_for = (timezone.now() + timedelta(hours=2)).isoformat()

    response = client.post(
        "/letters",
        data=(
            '{"recipientId":"%s","visibility":"private","subject":"Hello","body":"Letter body",'
            '"scheduledFor":"%s"}'
        )
        % (recipient.id, scheduled_for),
        content_type="application/json",
    )

    assert response.status_code == 201, response.content.decode()
    payload = response.json()
    assert payload["status"] == LetterStatus.QUEUED
    assert payload["recipientId"] == str(recipient.id)
    assert payload["scheduledFor"] is not None


@pytest.mark.django_db
def test_post_letters_rejects_invalid_payload():
    sender = User.objects.create_user(username="sender2@example.com", email="sender2@example.com", password="pw")
    client = Client()
    client.force_login(sender)

    response = client.post(
        "/letters",
        data='{"visibility":"private","body":""}',
        content_type="application/json",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_get_letter_allows_participant_only():
    sender = User.objects.create_user(username="sender3@example.com", email="sender3@example.com", password="pw")
    recipient = User.objects.create_user(
        username="recipient3@example.com", email="recipient3@example.com", password="pw"
    )
    outsider = User.objects.create_user(username="outsider@example.com", email="outsider@example.com", password="pw")

    letter = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Secret",
        scheduled_for=timezone.now(),
    )

    outsider_client = Client()
    outsider_client.force_login(outsider)
    forbidden = outsider_client.get(f"/letters/{letter.id}")
    assert forbidden.status_code == 403

    participant_client = Client()
    participant_client.force_login(recipient)
    allowed = participant_client.get(f"/letters/{letter.id}")
    assert allowed.status_code == 200
    assert allowed.json()["id"] == str(letter.id)


@pytest.mark.django_db
def test_letters_api_rejects_unauthorized_access():
    response = Client().get("/letters/00000000-0000-0000-0000-000000000001")
    assert response.status_code == 401


@pytest.mark.django_db
def test_get_letters_supports_pagination_and_visibility():
    user = User.objects.create_user(username="hist@example.com", email="hist@example.com", password="pw")
    recipient = User.objects.create_user(username="hist2@example.com", email="hist2@example.com", password="pw")
    other = User.objects.create_user(username="other@example.com", email="other@example.com", password="pw")
    client = Client()
    client.force_login(user)

    for idx in range(3):
        Letter.objects.create(
            sender=user,
            recipient=recipient,
            visibility=LetterVisibility.PRIVATE,
            status=LetterStatus.QUEUED,
            body=f"Owned {idx}",
            scheduled_for=timezone.now(),
        )
    Letter.objects.create(
        sender=other,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Not owned",
        scheduled_for=timezone.now(),
    )

    response = client.get("/letters?page=1&limit=2&visibility=private")

    assert response.status_code == 200
    payload = response.json()
    assert payload["page"] == 1
    assert payload["limit"] == 2
    assert payload["total"] == 3
    assert len(payload["results"]) == 2


@pytest.mark.django_db
def test_get_letters_orders_by_recent_activity():
    user = User.objects.create_user(username="order@example.com", email="order@example.com", password="pw")
    recipient = User.objects.create_user(username="order2@example.com", email="order2@example.com", password="pw")
    client = Client()
    client.force_login(user)

    older = Letter.objects.create(
        sender=user,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Older",
        scheduled_for=timezone.now(),
    )
    newer = Letter.objects.create(
        sender=user,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Newer",
        scheduled_for=timezone.now(),
    )

    older.updated_at = timezone.now() + timedelta(hours=1)
    older.save(update_fields=["updated_at"])
    newer.updated_at = timezone.now()
    newer.save(update_fields=["updated_at"])

    response = client.get("/letters?page=1&limit=10")

    assert response.status_code == 200
    ids = [row["id"] for row in response.json()["results"]]
    assert ids.index(str(newer.id)) < ids.index(str(older.id))

