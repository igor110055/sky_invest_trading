from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

import debug_toolbar


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.api.urls')),
    path('__debug__', include(debug_toolbar.urls))
]

if settings.DEBUG:
    if settings.STATIC_ROOT:
        urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    if settings.MEDIA_ROOT:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)