from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import PaymentOrder, PaymentOrderTether
from .serializers import PaymentOrderSerializer, PaymentOrderTetherSerializer
from .mixins import YooMoneyMixin
from .tasks import yomoney_payment_handler

from apps.copytrade.services import BinanceAPI

import logging

logger = logging.getLogger('register')


class PaymentOrderViewSet(GenericViewSet, YooMoneyMixin):
    queryset = PaymentOrder.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentOrderSerializer

    def create(self, request):
        """Редиректит на форму оплаты в yomoney"""
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = serializer.instance
        url = self.get_payment_url_for_yomoney(
                amount=data.amount,
                payment_id=data.payment_order_id
            )
        return HttpResponseRedirect(url)

    @action(methods=['post'],
            permission_classes=[AllowAny],
            detail=False)
    def payment_handler(self, request):
        """Обработчик платежа"""
        yomoney_payment_handler.delay(request.data)
        return Response(status=status.HTTP_200_OK)


class PaymentOrderTetherViewSet(GenericViewSet):
    queryset = PaymentOrderTether.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentOrderTetherSerializer
    client = BinanceAPI()

    def create(self, request):
        payment = PaymentOrderTether.objects.create(user=request.user)
        serializer = self.get_serializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def get_deposit_address(self, request):
        """Адрес кошелька для пополнения"""
        address = self.client.get_deposit_address()
        return Response({"address": address}, status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True)
    def confirm(self, request, *args, **kwargs):
        """ЗДЕСЬ НУЖНО УКАЗАТЬ TX_ID"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exceptions=True)
        serializer.save()

        return self.client.check_tx_id(serializer.validated_data['tx_id'])

