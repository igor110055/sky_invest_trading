from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from djoser.views import TokenCreateView, TokenDestroyView

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

    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.authtoken')),
    # path('auth/', include('djoser.urls.jwt')),

    path('auth/login/', TokenCreateView.as_view(), name='login'),
    path('auth/logout/', TokenDestroyView.as_view(), name='logout'),
    # path('auth/register/', ),

    # docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
