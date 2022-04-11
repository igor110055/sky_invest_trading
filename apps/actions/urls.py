from rest_framework.routers import SimpleRouter

from .views import *

router = SimpleRouter()
router.register('', ActionViewSet)

urlpatterns = []
urlpatterns += router.urls
