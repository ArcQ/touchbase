from .views import (
    AppUserViewSet, MyAppUserViewSet
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', AppUserViewSet, basename='user')
router.register(r'me/users', MyAppUserViewSet, basename='my_user')
urlpatterns = router.urls
