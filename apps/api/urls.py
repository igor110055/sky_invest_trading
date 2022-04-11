from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title='Skynet API',
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('copytrade/', include('apps.copytrade.urls')),
    path('actions/', include('apps.actions.urls')),

    # docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
