from django.db.models import QuerySet
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, permissions

id_param = openapi.Parameter('id', openapi.IN_PATH, description="id", type=openapi.TYPE_INTEGER)


def first_or_404(queryset: QuerySet):
    result = queryset.first()
    if result:
        return result
    else:
        raise Http404


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.get_owner == request.user


class AppModelViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """

    # for overriding

    permission_classes = [IsOwnerOrReadOnly]

    def pre_retrieve_hook(self, request, *args, **kwargs):
        pass

    def pre_update_hook(self, request, *args, **kwargs):
        pass

    def pre_partial_update_hook(self, request, *args, **kwargs):
        pass

    def pre_destroy_hook(self, request, *args, **kwargs):
        pass

    def pre_create_hook(self, request, *args, **kwargs):
        pass

    def get_object_owner(self, obj):
        # defaults to allowing anyone to change
        return self.request.user

    def create(self, request, *args, **kwargs):
        self.pre_create_hook(request, *args, **kwargs)
        return super(AppModelViewSet, self).create(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param])
    def retrieve(self, request, *args, **kwargs):
        self.pre_retrieve_hook(request, *args, **kwargs)
        return super(AppModelViewSet, self).retrieve(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param])
    def update(self, request, *args, **kwargs):
        self.pre_update_hook(request, *args, **kwargs)
        return super(AppModelViewSet, self).update(request, *args, **kwargs)

    def perform_update(self, serializer):
        # making an extra sql call here
        self.get_object()
        return super(AppModelViewSet, self).perform_update(self, serializer)

    @swagger_auto_schema(manual_parameters=[id_param])
    def partial_update(self, request, *args, **kwargs):
        self.pre_partial_update_hook(request, *args, **kwargs)
        return super(AppModelViewSet, self).partial_update(request, *args, **kwargs)

    @swagger_auto_schema(manual_parameters=[id_param])
    def destroy(self, request, *args, **kwargs):
        self.pre_destroy_hook(request, *args, **kwargs)
        return super(AppModelViewSet, self).destroy(request, *args, **kwargs)


class AppReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides the standard actions
    """

    # for overriding
    def pre_retrieve_hook(self, request, *args, **kwargs):
        pass

    @swagger_auto_schema(manual_parameters=[id_param])
    def retrieve(self, request, *args, **kwargs):
        self.pre_retrieve_hook(request, *args, **kwargs)
        return super(AppReadOnlyModelViewSet, self).retrieve(request, *args, **kwargs)
