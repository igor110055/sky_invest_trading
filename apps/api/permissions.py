from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTrader(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        print(request.user.is_trader)
        return request.user.is_trader and request.user.trader.verified
