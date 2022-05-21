from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from apps.users.views import BannerViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='Sky invest API',
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('copytrade/', include('apps.copytrade.urls')),
    path('actions/', include('apps.actions.urls')),
    path('auth/', include('apps.api.auth.urls')),
    path('payment/', include('apps.payments.urls')),
    path('banner/', BannerViewSet.as_view({'get': 'get_banner'}), name='banner'),

    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.authtoken')),
    # path('auth/', include('djoser.urls.jwt')),

    # path('auth/login/', TokenCreateView.as_view(), name='login'),
    # path('auth/logout/', TokenDestroyView.as_view(), name='logout'),
    # path('auth/register/', UserViewSet.as_view({'post': 'create', 'get': 'retrieve'}), name='register'),

    # docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
