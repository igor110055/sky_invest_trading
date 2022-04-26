import uuid

from django.db import models

from apps.users.models import Trader, User


class TradeGroup(models.Model):
    """Модель группы трейдера"""
    trader = models.ForeignKey(Trader, on_delete=models.SET_NULL,
                               null=True, related_name='groups', verbose_name='Создатель')
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True, default=uuid.uuid4)
    description = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    investors = models.ManyToManyField(User, verbose_name='Инвесторы', through='Membership')
    group_size = models.PositiveSmallIntegerField(
        default=5,
        verbose_name='Максимальное количество инвесторов',
    )
    need_sum = models.PositiveSmallIntegerField(verbose_name='Необходимая сумма')
    min_entry_sum = models.PositiveSmallIntegerField(verbose_name='Минимальная сумма входа')
    max_entry_sum = models.PositiveSmallIntegerField(verbose_name='Максимальная сумма входа')

    class Meta:
        verbose_name = 'Группа трейдера'
        verbose_name_plural = 'Группы трейдеров'

    def __str__(self):
        return f"{self.trader} : {self.title}"


class Membership(models.Model):
    """Модель членства инвесторов в TradeGroup"""
    investor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    group = models.ForeignKey(TradeGroup, on_delete=models.SET_NULL, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    invested_sum = models.PositiveSmallIntegerField(verbose_name="Инвестированная сумма")


