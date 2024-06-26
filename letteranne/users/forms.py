from django.contrib.auth.forms import UserChangeForm as DjangoAuthUserChangeForm
from django.contrib.auth.forms import UserCreationForm as DjangoAuthCreationForm

from letteranne.users.models import User


class UserCreation(DjangoAuthCreationForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
        )


class UserChange(DjangoAuthUserChangeForm):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
        )
