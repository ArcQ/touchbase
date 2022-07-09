from rest_framework.routers import SimpleRouter
from crypto import views

router = SimpleRouter()

router.register(r'nft', views.NftViewSet)
router.register(r'me/nft', views.MyNftViewSet)

urlpatterns = router.urls
