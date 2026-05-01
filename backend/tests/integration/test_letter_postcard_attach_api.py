import pytest
from django.contrib.auth import get_user_model
from django.test import Client
from django.utils import timezone

from apps.letters.models import Letter, LetterStatus, LetterVisibility
from apps.postcards.models import Postcard, PostcardSourceType, PostcardUnlockSource, UserPostcard

User = get_user_model()


@pytest.mark.django_db
def test_attach_postcard_success():
    sender = User.objects.create_user(username="attach-sender", email="attach-sender@example.com", password="pw")
    recipient = User.objects.create_user(username="attach-rec", email="attach-rec@example.com", password="pw")
    letter = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Letter",
        scheduled_for=timezone.now(),
    )
    postcard = Postcard.objects.create(
        code="PC-010",
        title="Attachable",
        image_url="https://example.com/pc10.png",
        source_type=PostcardSourceType.EVENT,
    )
    ownership = UserPostcard.objects.create(
        user=sender, postcard=postcard, unlocked_by=PostcardUnlockSource.EVENT
    )
    client = Client()
    client.force_login(sender)

    response = client.post(
        f"/letters/{letter.id}/postcard",
        data='{"userPostcardId":"%s"}' % ownership.id,
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json()["userPostcardId"] == str(ownership.id)


@pytest.mark.django_db
def test_attach_postcard_forbidden_for_unowned_postcard():
    sender = User.objects.create_user(username="attach-s2", email="attach-s2@example.com", password="pw")
    recipient = User.objects.create_user(username="attach-r2", email="attach-r2@example.com", password="pw")
    outsider = User.objects.create_user(username="attach-o2", email="attach-o2@example.com", password="pw")
    letter = Letter.objects.create(
        sender=sender,
        recipient=recipient,
        visibility=LetterVisibility.PRIVATE,
        status=LetterStatus.QUEUED,
        body="Letter",
        scheduled_for=timezone.now(),
    )
    postcard = Postcard.objects.create(
        code="PC-011",
        title="Locked",
        image_url="https://example.com/pc11.png",
        source_type=PostcardSourceType.EVENT,
    )
    ownership = UserPostcard.objects.create(
        user=outsider, postcard=postcard, unlocked_by=PostcardUnlockSource.EVENT
    )
    client = Client()
    client.force_login(sender)

    response = client.post(
        f"/letters/{letter.id}/postcard",
        data='{"userPostcardId":"%s"}' % ownership.id,
        content_type="application/json",
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_attach_postcard_not_found_cases():
    user = User.objects.create_user(username="attach-nf", email="attach-nf@example.com", password="pw")
    client = Client()
    client.force_login(user)

    response = client.post(
        "/letters/00000000-0000-0000-0000-000000000001/postcard",
        data='{"userPostcardId":"00000000-0000-0000-0000-000000000002"}',
        content_type="application/json",
    )

    assert response.status_code == 404

