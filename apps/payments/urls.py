from rest_framework.routers import SimpleRouter
from django.urls import path

from .views import *

router = SimpleRouter()
router.register('', PaymentOrderViewSet)

urlpatterns = []

urlpatterns += router.urls
