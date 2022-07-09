from rest_framework.serializers import ModelSerializer
from .models import AppUser


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            "username",
            "email",
            "photo_url",
            "is_onboarding",
            # write only
            'firebase_uid',
            'photo_url',
            'provider_id',
            'user_type',
        ]
        extra_kwargs = {
            'firebase_uid': {'read_only': True},

            'photo_url': {'allow_null': True},
            'username': {'allow_null': True},
            'provider_id': {'write_only': True},
        }


class AppUserUpdateSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            "username",
            "email",
            "photo_url",
            "is_active"
        ]


class PublicAppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = [
            "username",
            "email",
            "photo_url",
        ]
