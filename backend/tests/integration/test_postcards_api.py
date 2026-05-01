import pytest
from django.contrib.auth import get_user_model
from django.test import Client

from apps.postcards.models import Postcard, PostcardSourceType, PostcardUnlockSource, UserPostcard

User = get_user_model()


@pytest.mark.django_db
def test_get_postcards_collection_returns_owned_postcards():
    user = User.objects.create_user(username="owner-card", email="owner-card@example.com", password="pw")
    postcard = Postcard.objects.create(
        code="PC-001",
        title="First",
        image_url="https://example.com/pc1.png",
        source_type=PostcardSourceType.EVENT,
    )
    UserPostcard.objects.create(user=user, postcard=postcard, unlocked_by=PostcardUnlockSource.EVENT)
    client = Client()
    client.force_login(user)

    response = client.get("/postcards/collection")

    assert response.status_code == 200
    assert response.json()["items"][0]["code"] == "PC-001"


@pytest.mark.django_db
def test_grant_reward_creates_ownership_and_prevents_duplicate():
    user = User.objects.create_user(username="grant-user", email="grant-user@example.com", password="pw")
    postcard = Postcard.objects.create(
        code="PC-002",
        title="Second",
        image_url="https://example.com/pc2.png",
        source_type=PostcardSourceType.ACHIEVEMENT,
    )
    client = Client()
    client.force_login(user)

    created = client.post(
        "/postcards/grant",
        data='{"postcardId":"%s"}' % postcard.id,
        content_type="application/json",
    )
    duplicate = client.post(
        "/postcards/grant",
        data='{"postcardId":"%s"}' % postcard.id,
        content_type="application/json",
    )

    assert created.status_code == 201
    assert duplicate.status_code == 200
    assert UserPostcard.objects.filter(user=user, postcard=postcard).count() == 1

