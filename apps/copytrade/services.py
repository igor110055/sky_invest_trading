from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from django.utils import timezone

from .models import TradeGroup
from apps.payments.models import PaymentOrderTether, Withdraw
from binance import Client
from decimal import Decimal

import logging

withdraw_logger = logging.getLogger('withdraw')
payment_logger = logging.getLogger('payment_tether')
withdraw_groups = logging.getLogger('withdraw_from_groups')


class BinanceAPI:

    def __init__(self):
        self.client = Client(settings.BINANCE_API, settings.BINANCE_SECRET)

    def withdraw_from_group(self, group: TradeGroup) -> Response:
        trader = group.trader
        trader_deposit_address = Client(trader.binance_api_key, trader.binance_secret_key)\
            .get_deposit_address(coin='USDT')['address']

        group.trader_binance_balance = Decimal(self.client.get_asset_balance(asset='USDT')['free'])
        group.save(update_fields=['trader_binance_balance'])
        try:
            self.client.withdraw(coin='USDT', address=trader_deposit_address,
                                 amount=group.need_sum, name='Withdraw from sky invest')
            return Response(status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            withdraw_groups.warning(f'{timezone.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}'
                                    f' : withdraw_from_group error : {e}')
            return Response(status=status.HTTP_409_CONFLICT)

    def check_tx_id(self, order: PaymentOrderTether) -> Response:
        tx_id = order.tx_id
        if PaymentOrderTether.objects.filter(tx_id=tx_id).exists():
            return Response({'message': 'Этот Tx ID уже использовался'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        try:
            for item in self.client.get_deposit_history(coin='USDT'):
                if item['txId'] == tx_id or item['txId'].split()[2] == tx_id and item['status'] == 1:
                    order.status = 'success'
                    order.save(update_fields=['status'])

                    user_pocket = order.user.balance
                    user_pocket.balance += Decimal(item['amount'])
                    user_pocket.save(update_fields=['balance'])
                    return Response({'message': 'Баланс успешно пополнен'}, status=status.HTTP_202_ACCEPTED)
            return Response({'message': 'Данный txId не найден в истории'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            order.status = 'not_success'
            order.save(update_fields=['status'])
            payment_logger.warning(f'{timezone.datetime.now().strftime("%Y-%m-%d %H:%M:%S")} : payment_error : {e}')
            return Response(status=status.HTTP_409_CONFLICT)

    def get_deposit_address(self):
        return self.client.get_deposit_address(coin='USDT')['address']

    def withdraw(self, obj: Withdraw) -> Response:
        try:
            user_balance = obj.user.balance
            user_balance.balance -= obj.amount
            user_balance.save(update_fields=['balance'])

            self.client.withdraw(coin='USDT', address=obj.address, amount=obj.amount, name='Withdraw')

            obj.status = 'success'
            obj.save(update_fields=['status'])
            return Response(status=status.HTTP_202_ACCEPTED)

        except Exception as e:
            obj.status = 'not_success'
            obj.save(update_fields=['status'])
            withdraw_logger.warning(f'{timezone.datetime.now().strftime("%Y-%m-%d %H:%M:%S")} : withdraw_error : {e}')
            return Response(status=status.HTTP_409_CONFLICT)
