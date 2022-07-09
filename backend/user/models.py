from enum import Enum

from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django_extensions.db.models import TimeStampedModel


class AppUser(AbstractUser, TimeStampedModel, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    active = models.BooleanField(default=True)

    is_superuser = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    photo_url = models.CharField(max_length=255, null=True)
    provider_id = models.CharField(max_length=40, null=True)

    auth_uid = models.CharField(max_length=40, unique=True, null=False)
    profile_description = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    username = models.CharField(max_length=255, unique=True)

    class Meta:
        indexes = [
            models.Index(fields=['auth_uid']),
        ]

    def get_owner(self):
        return self
