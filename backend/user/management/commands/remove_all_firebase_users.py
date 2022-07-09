from django.core.management.base import BaseCommand
from firebase_admin import auth


class Command(BaseCommand):
    def handle(self, *args, **options):
        for user in auth.list_users().iterate_all():
            print("Deleting user " + user.uid)
            auth.delete_user(user.uid)
