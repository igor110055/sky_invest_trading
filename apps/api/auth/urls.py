from django.urls import path, re_path

from djoser.views import TokenDestroyView, TokenCreateView, UserViewSet

from apps.users.views import TOTPVerifyView, TOTPCreateView, OTPTokenCreateView

urlpatterns = [
    path('totp/create/', TOTPCreateView.as_view(), name='totp-create'),
    path('totp/login/<int:token>', TOTPVerifyView.as_view(), name='totp-login'),
    path('login/', OTPTokenCreateView.as_view(), name='login'),
    path('logout/', TokenDestroyView.as_view(), name='logout'),
    path('register/', UserViewSet.as_view({'post': 'create'}), name='register'),
    path('activation/', UserViewSet.as_view({'post': 'activation'}), name='activation'),
    path('reset_password/', UserViewSet.as_view({'post': 'reset_password'}), name='reset_password'),
    path('reset_password_confirm/', UserViewSet.as_view({'post': 'reset_password_confirm'}),
         name='reset_password_confirm'),
]
