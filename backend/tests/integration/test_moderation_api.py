import pytest
from django.contrib.auth import get_user_model
from django.test import Client
from django.utils import timezone

from apps.letters.models import Letter, LetterStatus, LetterVisibility

User = get_user_model()


@pytest.mark.django_db
def test_create_moderation_report_success():
    reporter = User.objects.create_user(username="reporter", email="reporter@example.com", password="pw")
    author = User.objects.create_user(username="author-m", email="author-m@example.com", password="pw")
    letter = Letter.objects.create(
        sender=author,
        recipient=None,
        visibility=LetterVisibility.OPEN,
        status=LetterStatus.QUEUED,
        body="Bad content",
        scheduled_for=timezone.now(),
    )
    client = Client()
    client.force_login(reporter)

    response = client.post(
        "/moderation/reports",
        data='{"letterId":"%s","reason":"abusive"}' % letter.id,
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.json()["status"] == "open"


@pytest.mark.django_db
def test_create_moderation_report_invalid_payload():
    reporter = User.objects.create_user(username="reporter2", email="reporter2@example.com", password="pw")
    client = Client()
    client.force_login(reporter)

    response = client.post("/moderation/reports", data='{"reason":""}', content_type="application/json")
    assert response.status_code == 400

