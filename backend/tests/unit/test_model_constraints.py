from datetime import timedelta

import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.utils import timezone

from apps.letters.models import Letter, LetterVisibility
from apps.postcards.models import Postcard, PostcardSourceType, PostcardUnlockSource, UserPostcard

User = get_user_model()


@pytest.mark.django_db
def test_private_letter_requires_recipient():
    sender = User.objects.create_user(username="sender@example.com", email="sender@example.com")

    with pytest.raises(IntegrityError):
        Letter.objects.create(
            sender=sender,
            recipient=None,
            visibility=LetterVisibility.PRIVATE,
            body="Hello",
            scheduled_for=timezone.now() + timedelta(minutes=5),
        )


@pytest.mark.django_db
def test_user_postcard_pair_is_unique():
    user = User.objects.create_user(username="owner@example.com", email="owner@example.com")
    postcard = Postcard.objects.create(
        code="WELCOME-01",
        title="Welcome",
        image_url="https://example.com/postcard.png",
        source_type=PostcardSourceType.EVENT,
    )

    UserPostcard.objects.create(user=user, postcard=postcard, unlocked_by=PostcardUnlockSource.EVENT)
    with pytest.raises(IntegrityError):
        UserPostcard.objects.create(user=user, postcard=postcard, unlocked_by=PostcardUnlockSource.EVENT)

