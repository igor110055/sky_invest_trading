from django.db import models

from apps.users.models import User


class Action(models.Model):

    class ActionType(models.TextChoices):
        COPY = 'copy', 'Копирование трейдера'
        TOP_UP_BALANCE = 'top_up_balance', 'Пополнение баланса'
        WITHDRAW = 'withdraw', 'Вывод'
        JOIN = 'join_group', 'Присоединение к группе'

    class Status(models.TextChoices):
        SUCCESS = 'success', 'Успешно'
        NOT_SUCCESS = 'not_success', 'Не успешно'
        WAITING = 'waiting', 'Ожидание'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='actions', verbose_name="Пользователь")
    action_type = models.CharField(choices=ActionType.choices, max_length=30, verbose_name="Тип действия")
    amount = models.PositiveSmallIntegerField(null=True, verbose_name='Сумма средств')
    group = models.CharField(max_length=150, blank=True, verbose_name='Слаг группы')
    trader = models.CharField(max_length=150, blank=True, verbose_name='Трейдер')
    top_up_method = models.CharField(max_length=50, blank=True, verbose_name='Способ пополнения баланса')
    created = models.DateTimeField(auto_now_add=True, verbose_name="Дата")
    status = models.CharField(choices=Status.choices, max_length=20, verbose_name='Статус')

    class Meta:
        verbose_name = 'Действие'
        verbose_name_plural = 'Действия'

    def __str__(self):
        return f'{self.user} : {self.action_type}'
