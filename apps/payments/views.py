from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import PaymentOrder
from .serializers import PaymentOrderSerializer
from .mixins import YomoneyMixin


class PaymentOrderViewSet(GenericViewSet, YomoneyMixin):
    queryset = PaymentOrder.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentOrderSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = serializer.data
        return HttpResponseRedirect(
            self.get_payment_url_for_yomoney(
                amount=data['amount'],
                payment_id=data['payment_order_id']
            )
        )


    @action(methods=['post'],
            permission_classes=[AllowAny],
            detail=False)
    def payment_handler(self, request):
        pass

