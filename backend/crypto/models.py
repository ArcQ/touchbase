import uuid as uuid
from django.db import models
from django_extensions.db.models import TimeStampedModel


class Nft(TimeStampedModel):
    asset_url = models.CharField(null=True, max_length=1000)
    # no longer necessary?
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)

    total_minted = models.BigIntegerField()
    contract_id = models.IntegerField()
    contract_address = models.CharField()
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name


class NftAnalytics(TimeStampedModel):
    transaction_hash = models.CharField(max_length=66)
    log_index = models.IntegerField(null=True, blank=True)
    transactions = models.JSONField(max_length=255)
    the_time = models.DateField()
    block = models.BigIntegerField()
    sender = models.CharField(max_length=66)
    reciever = models.CharField(max_length=66)
    price = models.DecimalField(max_digits=99, decimal_places=24, null=True, blank=True)
    currency = models.CharField(max_length=4, null=True, blank=True)
