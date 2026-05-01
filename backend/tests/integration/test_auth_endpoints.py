import pytest
from django.contrib.auth import get_user_model
from django.test import Client

User = get_user_model()


@pytest.mark.django_db
def test_register_creates_user_and_logs_in():
    client = Client()
    response = client.post(
        "/auth/register",
        data='{"email":"test@example.com","password":"secret-123"}',
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"
    assert User.objects.filter(email="test@example.com").exists()


@pytest.mark.django_db
def test_register_duplicate_email_returns_conflict():
    User.objects.create_user(username="taken@example.com", email="taken@example.com", password="pw-12345")
    client = Client()
    response = client.post(
        "/auth/register",
        data='{"email":"taken@example.com","password":"secret-123"}',
        content_type="application/json",
    )

    assert response.status_code == 409


@pytest.mark.django_db
def test_login_with_valid_credentials_returns_ok():
    User.objects.create_user(username="login@example.com", email="login@example.com", password="pw-12345")
    client = Client()
    response = client.post(
        "/auth/login",
        data='{"email":"login@example.com","password":"pw-12345"}',
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json() == {"detail": "Logged in"}


@pytest.mark.django_db
def test_login_with_invalid_credentials_returns_401():
    User.objects.create_user(username="bad@example.com", email="bad@example.com", password="pw-12345")
    client = Client()
    response = client.post(
        "/auth/login",
        data='{"email":"bad@example.com","password":"wrong"}',
        content_type="application/json",
    )

    assert response.status_code == 401


@pytest.mark.django_db
def test_logout_returns_ok():
    User.objects.create_user(username="logout@example.com", email="logout@example.com", password="pw-12345")
    client = Client()
    client.login(username="logout@example.com", password="pw-12345")
    response = client.post("/auth/logout")

    assert response.status_code == 200
    assert response.json() == {"detail": "Logged out"}

