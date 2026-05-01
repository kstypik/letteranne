import pytest
from django.contrib.auth import get_user_model

from apps.postcards.models import Postcard, PostcardSourceType, UserPostcard
from apps.postcards.services import grant_postcard_to_user

User = get_user_model()


@pytest.mark.django_db
def test_grant_postcard_to_user_is_idempotent():
    user = User.objects.create_user(username="service-user", email="service-user@example.com")
    postcard = Postcard.objects.create(
        code="PC-003",
        title="Third",
        image_url="https://example.com/pc3.png",
        source_type=PostcardSourceType.EVENT,
    )

    _, created_first = grant_postcard_to_user(user=user, postcard=postcard)
    _, created_second = grant_postcard_to_user(user=user, postcard=postcard)

    assert created_first is True
    assert created_second is False
    assert UserPostcard.objects.filter(user=user, postcard=postcard).count() == 1

