import pytest
from django.contrib.auth import get_user_model
from django.test import Client

from apps.profiles.models import UserProfile

User = get_user_model()


@pytest.mark.django_db
def test_get_user_by_display_id_returns_user():
    caller = User.objects.create_user(username="caller", email="caller@example.com", password="pw")
    user = User.objects.create_user(username="alice", email="alice@example.com", password="pw")
    UserProfile.objects.create(user=user, bio="Hi", avatar_url="https://example.com/a.png")
    client = Client()
    client.force_login(caller)

    response = client.get("/users/by-id/alice")

    assert response.status_code == 200
    assert response.json()["displayId"] == "alice"


@pytest.mark.django_db
def test_get_user_by_display_id_not_found():
    caller = User.objects.create_user(username="caller2", email="caller2@example.com", password="pw")
    client = Client()
    client.force_login(caller)

    response = client.get("/users/by-id/missing")

    assert response.status_code == 404


@pytest.mark.django_db
def test_discover_returns_randomized_list_shape():
    caller = User.objects.create_user(username="caller3", email="caller3@example.com", password="pw")
    User.objects.create_user(username="u1", email="u1@example.com", password="pw")
    User.objects.create_user(username="u2", email="u2@example.com", password="pw")
    client = Client()
    client.force_login(caller)

    response = client.get("/users/discover?limit=2")

    assert response.status_code == 200
    assert "users" in response.json()
    assert len(response.json()["users"]) <= 2


@pytest.mark.django_db
def test_discovery_requires_authentication():
    response = Client().get("/users/discover")
    assert response.status_code == 401

