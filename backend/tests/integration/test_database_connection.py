import pytest
from django.db import connection


@pytest.mark.django_db
def test_database_connection_executes_simple_query():
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        row = cursor.fetchone()

    assert row == (1,)

