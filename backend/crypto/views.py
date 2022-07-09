from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions

from backend.common.AppModelViewSet import AppModelViewSet, AppReadOnlyModelViewSet
from crypto.models import Nft
from crypto.serializers import NftSerializer


class NftViewSet(AppReadOnlyModelViewSet):
    queryset = Nft.objects.order_by('pk')
    serializer_class = NftSerializer
    lookup_field = 'uuid'
    permission_classes = [permissions.AllowAny, ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['uuid']

    @swagger_auto_schema(
        manual_parameters=[openapi.Parameter('uuid', openapi.IN_PATH, description="id", type=openapi.TYPE_STRING)])
    def retrieve(self, request, *args, **kwargs):
        self.pre_retrieve_hook(request, *args, **kwargs)
        return super(NftViewSet, self).retrieve(request, *args, **kwargs)


class MyNftViewSet(AppModelViewSet):
    queryset = Nft.objects.order_by('pk')
    serializer_class = NftSerializer

    def get_queryset(self):
        # initial version every user will only have one company
        return Nft.objects.filter(companyusers__user=self.request.user)


def public_nft_data_uri_api(request, nft_uuid):
    nft = Nft.objects.get(uuid=nft_uuid)
    return JsonResponse({
        "image": nft.asset_url,
        "description": "",
        "name": nft.name,
        "background_color": "FFFFFF",
        "attributes": [
            {"trait_type": "jurisdiction", "value": nft.jurisdiction.name},
            {"trait_type": "company", "value": nft.company.name},
            {"trait_type": "expiry_date", "value": nft.expiry_date},
            {"trait_type": "quantity", "value": nft.total_minted},
        ],
    })
