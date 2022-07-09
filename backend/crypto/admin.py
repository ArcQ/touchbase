from django.contrib import admin
from .models import Nft, NftAnalytics


class NftAdmin(admin.ModelAdmin):
    list_display = ["created", "name", "expiry_date"]
    readonly_fields = (
        "created",
        "modified",
        "uuid",
    )


admin.site.register(Nft, NftAdmin)
admin.site.register(NftAnalytics)
