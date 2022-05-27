from rest_framework.response import Response
from rest_framework import status

from django.conf import settings

from .models import TradeGroup

from binance import Client


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

