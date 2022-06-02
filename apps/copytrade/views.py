from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings

from .models import TradeGroup
from .serializers import TradeGroupSerializer, MembershipSerializer, TradeGroupCreateSerializer
from .tasks import withdraw_after_join_to_group
from .services import BinanceAPI

from apps.actions.tasks import action_trade_group
from apps.api.permissions import IsTrader, IsVerified, IsGroupOwner
from apps.telegram_bot.tasks import notify_trader


class TraderGroupViewSet(RetrieveModelMixin,
                         ListModelMixin,
                         GenericViewSet):
    queryset = TradeGroup.objects.filter(status=TradeGroup.Status.RECRUITED)
    serializer_class = TradeGroupSerializer
    permission_classes = [IsTrader, IsVerified]

    def get_serializer_class(self):
        if self.action == 'create':
            return TradeGroupCreateSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        action_trade_group.delay(serializer.instance.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post', 'get'], detail=False,
            serializer_class=MembershipSerializer,
            permission_classes=[IsAuthenticated, IsVerified])
    def join(self, request):
        if request.method == 'GET':
            serializer = MembershipSerializer()
            return Response(serializer.data)

        serializer = MembershipSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        withdraw_after_join_to_group.delay(serializer.instance.id)
        notify_trader.delay(serializer.instance.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True, permission_classes=[IsGroupOwner])
    def withdraw(self, request, pk):
        """Вывод средств на binance"""
        binance_api = BinanceAPI()
        instance = self.get_object()
        return binance_api.withdraw_from_group(instance)

