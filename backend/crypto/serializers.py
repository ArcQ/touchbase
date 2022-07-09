from rest_framework.serializers import ModelSerializer

from crypto.models import Nft, NftAnalytics


class NftSerializer(ModelSerializer):
    class Meta:
        model = Nft
        fields = '__all__'


class NftAnalyticsSerializer(ModelSerializer):
    class Meta:
        model = NftAnalytics
        fields = '__all__'
