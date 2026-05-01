import pytest
from django.contrib.auth import get_user_model
from django.test import Client
from django.utils import timezone

from apps.letters.models import Letter, LetterStatus, LetterVisibility

User = get_user_model()


@pytest.mark.django_db
def test_get_open_letters_returns_paginated_feed():
    author = User.objects.create_user(username="open-author", email="open-author@example.com", password="pw")
    for idx in range(3):
        Letter.objects.create(
            sender=author,
            recipient=None,
            visibility=LetterVisibility.OPEN,
            status=LetterStatus.QUEUED,
            body=f"Open {idx}",
            scheduled_for=timezone.now(),
        )

    response = Client().get("/letters/open?page=1&limit=2")

    assert response.status_code == 200
    payload = response.json()
    assert payload["limit"] == 2
    assert payload["total"] == 3
    assert len(payload["results"]) == 2


@pytest.mark.django_db
def test_post_letters_supports_open_visibility():
    sender = User.objects.create_user(username="open-sender", email="open-sender@example.com", password="pw")
    client = Client()
    client.force_login(sender)

    response = client.post(
        "/letters",
        data='{"visibility":"open","subject":"Open","body":"Public note"}',
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.json()["visibility"] == "open"
    assert response.json()["recipientId"] is None


@pytest.mark.django_db
def test_post_replies_creates_threaded_reply():
    author = User.objects.create_user(username="thread-author", email="thread-author@example.com", password="pw")
    replier = User.objects.create_user(username="thread-reply", email="thread-reply@example.com", password="pw")
    parent = Letter.objects.create(
        sender=author,
        recipient=None,
        visibility=LetterVisibility.OPEN,
        status=LetterStatus.QUEUED,
        body="Parent",
        scheduled_for=timezone.now(),
    )
    client = Client()
    client.force_login(replier)

    response = client.post(
        f"/letters/{parent.id}/replies",
        data='{"body":"Reply body"}',
        content_type="application/json",
    )

    assert response.status_code == 201
    reply = Letter.objects.get(id=response.json()["id"])
    assert reply.parent_letter_id == parent.id


@pytest.mark.django_db
def test_post_replies_validates_payload():
    author = User.objects.create_user(username="thread-author2", email="thread-author2@example.com", password="pw")
    replier = User.objects.create_user(username="thread-reply2", email="thread-reply2@example.com", password="pw")
    parent = Letter.objects.create(
        sender=author,
        recipient=None,
        visibility=LetterVisibility.OPEN,
        status=LetterStatus.QUEUED,
        body="Parent",
        scheduled_for=timezone.now(),
    )
    client = Client()
    client.force_login(replier)

    response = client.post(
        f"/letters/{parent.id}/replies",
        data='{"body":""}',
        content_type="application/json",
    )

    assert response.status_code == 400

