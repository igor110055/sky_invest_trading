from rest_framework.permissions import BasePermission, SAFE_METHODS

from django_otp import user_has_device


class IsTrader(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        print(request.user.is_trader)
        return request.user.is_trader and request.user.trader.verified


# class IsOtpVerified(BasePermission):
#     """If user has verified TOTP device, require TOTP OTP."""
#
#     message = "You do not have permission to perform this action until you verify your OTP device"
#
#     def has_permission(self, request, view):
#         if user_has_device(request.user):
