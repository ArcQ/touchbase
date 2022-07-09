from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from backend.common.AppModelViewSet import AppModelViewSet, AppReadOnlyModelViewSet, first_or_404, IsOwnerOrReadOnly, \
    id_param
from firebase.models import AppUser
from firebase.serializers import AppUserSerializer, PublicAppUserSerializer, AppUserUpdateSerializer


class AppUserViewSet(AppReadOnlyModelViewSet):
    """
    A viewset that provides the standard actions
    """
    queryset = AppUser.objects.all()
    serializer_class = PublicAppUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']
    permission_classes = []

    # authentication_classes = []


class MyAppUserViewSet(AppModelViewSet):
    """
    A viewset that provides the standard actions
    """
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']

    # authentication_classes = []

    def get_queryset(self):
        # initial version every user will only have one company
        return AppUser.objects.filter(user_id=self.request.user.id)

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        elif self.action in ['retrieve', 'list']:
            self.permission_classes = [permissions.AllowAny, ]
        return super(self.__class__, self).get_permissions()

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'PUT' or self.request == 'PATCH':
            serializer_class = AppUserUpdateSerializer

        return serializer_class

    @swagger_auto_schema(request_body=AppUserSerializer,
                         responses={201: AppUserSerializer()})
    def create(self, request, pk=None, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        request.user.email = request.data['email']
        request.user.username = request.data['username']
        request.user.provider_id = request.data['provider_id']
        request.user.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @swagger_auto_schema(manual_parameters=[id_param],
                         responses={200: AppUserSerializer()})
    def retrieve(self, request, *args, **kwargs):
        return super(AppModelViewSet, self).retrieve(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param], request_body=AppUserSerializer,
                         responses={200: AppUserSerializer()})
    def update(self, request, *args, **kwargs):
        return super(AppModelViewSet, self).update(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param], request_body=AppUserSerializer,
                         responses={200: AppUserSerializer()})
    def partial_update(self, request, *args, **kwargs):
        return super(AppModelViewSet, self).partial_update(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param])
    def destroy(self, request, *args, **kwargs):
        return super(AppModelViewSet, self).destroy(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param],
                         responses={200: AppUserSerializer()})
    @action(detail=True, methods=['patch'])
    def set_email_verified(self, request, pk=None):
        pass
