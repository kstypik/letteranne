import pytest
from django.contrib.auth import get_user_model
from django.test import Client

User = get_user_model()


@pytest.mark.django_db
def test_gdpr_export_requires_auth():
    response = Client().post("/gdpr/export")
    assert response.status_code == 401


@pytest.mark.django_db
def test_gdpr_export_returns_stub_for_authenticated_user():
    user = User.objects.create_user(username="gdpr-user", email="gdpr@example.com", password="pw")
    client = Client()
    client.force_login(user)

    response = client.post("/gdpr/export")
    assert response.status_code == 200
    assert response.json()["status"] == "export_stub"


@pytest.mark.django_db
def test_gdpr_delete_deactivates_account():
    user = User.objects.create_user(username="gdpr-del", email="gdpr-del@example.com", password="pw")
    client = Client()
    client.force_login(user)

    response = client.post("/gdpr/delete-account")
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.is_active is False

