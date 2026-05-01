import pytest
from django.test import Client


@pytest.mark.django_db
def test_openapi_endpoint_returns_yaml_content():
    client = Client()
    response = client.get("/openapi")

    assert response.status_code == 200
    assert "openapi:" in response.content.decode("utf-8")

