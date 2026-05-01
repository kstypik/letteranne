import pytest
from django.contrib.auth import get_user_model
from django.test import Client

from apps.profiles.models import UserProfile

User = get_user_model()


@pytest.mark.django_db
def test_get_profiles_me_returns_authenticated_profile():
    user = User.objects.create_user(username="me@example.com", email="me@example.com", password="pw-12345")
    UserProfile.objects.create(user=user, bio="Hello", avatar_url="https://example.com/avatar.png")
    client = Client()
    client.force_login(user)

    response = client.get("/profiles/me")

    assert response.status_code == 200
    assert response.json() == {
        "email": "me@example.com",
        "bio": "Hello",
        "avatarUrl": "https://example.com/avatar.png",
    }


@pytest.mark.django_db
def test_patch_profiles_me_updates_bio_and_avatar():
    user = User.objects.create_user(
        username="update@example.com", email="update@example.com", password="pw-12345"
    )
    client = Client()
    client.force_login(user)

    response = client.patch(
        "/profiles/me",
        data='{"bio":"Updated bio","avatarUrl":"https://example.com/new.png"}',
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json()["bio"] == "Updated bio"
    assert response.json()["avatarUrl"] == "https://example.com/new.png"


@pytest.mark.django_db
def test_profiles_me_rejects_unauthorized_access():
    client = Client()
    response = client.get("/profiles/me")
    assert response.status_code == 401


@pytest.mark.django_db
def test_profiles_me_rejects_invalid_payload():
    user = User.objects.create_user(username="invalid@example.com", email="invalid@example.com", password="pw")
    client = Client()
    client.force_login(user)

    response = client.patch(
        "/profiles/me",
        data='{"avatarUrl":"not-a-url"}',
        content_type="application/json",
    )

    assert response.status_code == 400
    assert response.json()["error"]["message"] == "avatarUrl must be a valid URL"

