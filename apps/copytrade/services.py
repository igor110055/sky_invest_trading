from rest_framework.response import Response
from rest_framework import status

from django.conf import settings

from .models import TradeGroup
from apps.payments.models import PaymentOrderTether
from binance import Client
from decimal import Decimal


class BinanceAPI:

    def __init__(self):
        self.client = Client(settings.BINANCE_API, settings.BINANCE_SECRET)

    def withdraw_from_group(self, group: TradeGroup) -> Response:
        trader = group.trader
        trader_deposit_address = Client(trader.binance_api_key, trader.binance_secret_key)\
            .get_deposit_address(coin='USDT')['address']

        investors = group.investors

        total_amount = 0

        for i in investors:
            total_amount += i.invested_sum

        self.client.withdraw(coin='USDT', address=trader_deposit_address,
                             amount=total_amount, name='Withdraw from sky invest')
        return Response(status=status.HTTP_202_ACCEPTED)

    def check_tx_id(self, order: PaymentOrderTether) -> Response:
        tx_id = order.tx_id

        if PaymentOrderTether.objects.filter(tx_id=tx_id).exists():
            return Response({'message': 'Этот Tx ID уже использовался'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        for item in self.client.get_deposit_history(coin='USDT'):
            if item['txId'] == tx_id or item['txId'].split()[2] == tx_id and item['status'] == 1:
                order.paid = True
                order.save(update_fields=['paid'])

                user_pocket = order.user.balance
                user_pocket.balance += Decimal(item['amount'])
                user_pocket.save(update_fields=['balance'])

                return Response({'message': 'Баланс успешно пополнен'}, status=status.HTTP_202_ACCEPTED)

        return Response({'message': 'Данный txId не найден в истории'}, status=status.HTTP_404_NOT_FOUND)

    def get_deposit_address(self):
        return self.client.get_deposit_address(coin='USDT')['address']
