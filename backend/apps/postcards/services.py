from apps.postcards.models import Postcard, PostcardUnlockSource, UserPostcard


def grant_postcard_to_user(*, user, postcard: Postcard, unlocked_by: str = "event"):
    ownership, created = UserPostcard.objects.get_or_create(
        user=user,
        postcard=postcard,
        defaults={"unlocked_by": unlocked_by},
    )
    return ownership, created

