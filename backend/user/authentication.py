from random import randint

import firebase_admin
from django.conf import settings
from django.db import transaction
from firebase_admin import auth
from firebase_admin import credentials
from rest_framework import authentication
from rest_framework import status
from rest_framework.exceptions import APIException

from firebase.models import AppUser

cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
firebase_admin.initialize_app(cred)


class NoAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "No authentication token provided"
    default_code = "no_auth_token"


class InvalidAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Invalid authentication token provided"
    default_code = "invalid_token"


class FirebaseError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "The user provided with the auth token is not a valid Firebase user, it has no Firebase UID"
    default_code = "no_firebase_uid"


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        print(request.path)
        uid = None
        try:
            auth_header = request.META.get("HTTP_AUTHORIZATION")
            if not auth_header:
                raise NoAuthToken("No auth token provided")

            id_token = auth_header.split(" ").pop()
            decoded_token = auth.verify_id_token(id_token)

            if not id_token or not decoded_token:
                raise NoAuthToken("No auth token provided")

            uid = decoded_token.get("uid")

        except Exception:
            # return (AnonymousUser(), None)
            return None

        user = None

        # TODO WTF IS HAPPENING HERE
        try:
            print(request.path)
            print(request.method)
            print(request.data)
            user = AppUser.objects.get(firebase_uid=uid)
        except AppUser.DoesNotExist:
            print('does not')
            try:
                (user, is_created) = AppUser.objects.create(
                    firebase_uid=uid,
                    user_type=request.data['user_type'] if 'user_type' in request.data else "company",
                    username=request.data['username'] if 'username' in request.data else f"User{randint(0, 100000)}"
                )
            except Exception as e:
                print(e)
                user = AppUser.objects.get(firebase_uid=uid)

        return (user, uid)
