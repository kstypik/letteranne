import pytest
from django.test import Client


@pytest.mark.django_db
def test_healthcheck_returns_ok_payload():
    client = Client()
    response = client.get("/healthz")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

