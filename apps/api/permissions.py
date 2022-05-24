from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTrader(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_trader and request.user.verified


class IsVerified(BasePermission):

    def has_permission(self, request, view):
        return request.user.verified

