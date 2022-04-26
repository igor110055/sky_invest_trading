from django.db import models

from apps.users.models import User

from uuid import uuid4


class PaymentOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,
                             related_name='payments', verbose_name='Пользователь')
    payment_order_id = models.UUIDField(default=uuid4, verbose_name='Идентификатор платежа')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Сумма')
    paid = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated = models.DateTimeField(auto_now=True, verbose_name='Обновлено')

    class Meta:
        verbose_name = "Платеж"
        verbose_name_plural = 'Платежи'

    def __str__(self):
        return f'{self.user} : {self.amount} | {self.created}'

