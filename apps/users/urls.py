from rest_framework.routers import SimpleRouter

from .views import *

router = SimpleRouter()
# router.register('user', UserRegisterViewSet)
router.register('trader', TraderViewSet)


urlpatterns = []

urlpatterns += router.urls
