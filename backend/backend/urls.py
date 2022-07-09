from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

import crypto.views as token_views
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings


class LandingView(TemplateView):
    template_name = "landing.html"


urlpatterns = [
    path("blockdash/", admin.site.urls),
    path("", LandingView.as_view(), name="landing"),
    path('api/v1/', include('users.urls')),
    path('api/v1/', include('tokens.urls')),
    path(
        "nft-data/<str:nft_uuid>",
        token_views.public_nft_data_uri_api,
        name="contract_uri_data",
    ),
]

if settings.ENV == "DEV" or settings.ENV == "STG":
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    api_info = openapi.Info(
        title="Backend API",
        default_version='v1',
        description="Test description",
    )

    schema_view = get_schema_view(
        api_info,
        public=True,
        permission_classes=(permissions.AllowAny,),
    )

    urlpatterns += [
        url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        url(r'^app/redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
