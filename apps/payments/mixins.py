from django.conf import settings

import requests


class YomoneyMixin:

    url = 'https://yoomoney.ru/quickpay/confirm.xml'

    def get_payment_url_for_yomoney(self, amount: int, payment_id: str) -> str:
        params = {
            'receiver': settings.YOMONEY_POCKET,
            'quickpay-form': 'small',
            'targets': 'Пополнение баланса Sky invest',
            'paymentType': 'PC',
            'sum': amount,
            'formcomment': 'Пополнение баланса Sky invest',
            'short-dest': 'Пополнение баланса Sky invest',
            'label': payment_id,
            'successURL': 'https://netex.kg'
        }
        redirect_url = requests.Request(url=self.url, params=params).prepare().url
        return redirect_url
