from django.core.management.base import BaseCommand

from crypto.utils.pull_chain_data import pull_mint_events


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument("jobs", nargs="+", type=str)

    def handle(self, *args, **options):

        if "pull_chain_data" in options["jobs"]:
            pull_mint_events()
            # pull_transactions()
