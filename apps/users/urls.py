from rest_framework.routers import SimpleRouter

from django.urls import path, re_path

from .views import *

router = SimpleRouter()
router.register('trader', TraderViewSet)
router.register('totp', TOTPUpdateViewSet)
router.register('', VerificationView)
router.register('', InvestorDashboardView)

urlpatterns = [
    path('totp/create/', TOTPCreateView.as_view(), name='totp-create'),
    # re_path(r'^totp/login/(?P<token>[0-9]{6})/$', TOTPVerifyView.as_view(), name='totp-login')
]

urlpatterns += router.urls
