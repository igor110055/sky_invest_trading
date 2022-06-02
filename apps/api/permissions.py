from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTrader(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_trader and request.user.verified


class IsVerified(BasePermission):

    def has_permission(self, request, view):
        return request.user.verified


class IsGroupOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_trader:
            return obj.trader == request.user.trader
        return False


class WithdrawFromGroup(BasePermission):
    def has_object_permission(self, request, view, obj):
        received_sum = 0
        for i in obj.investors:
            received_sum += i.invested_sum
        return obj.need_sum == received_sum
