import uuid

from django.db import models
from django.core.validators import MaxValueValidator

from apps.users.models import Trader, User


class TradeGroup(models.Model):
    """Модель группы трейдера"""

    class GroupType(models.TextChoices):
        TRADE = 'trade', 'трейдинг'
        OTHER = 'other', 'другое'
        ICO = 'ico', 'ico'

    class Status(models.TextChoices):
        STARTED = 'started', 'стартовала'
        RECRUITED = 'recruited', 'набирается'
        COMPLETED = 'completed', 'завершена'

    trader = models.ForeignKey(Trader, on_delete=models.SET_NULL,
                               null=True, related_name='groups', verbose_name='Создатель')
    group_type = models.CharField(max_length=10, choices=GroupType.choices, verbose_name='Тип группы')
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

    percent_from_income = models.PositiveSmallIntegerField(verbose_name='Процент от прибыли',
                                                           validators=[MaxValueValidator(100)])
    status = models.CharField(max_length=20, choices=Status.choices,
                              default=Status.RECRUITED, verbose_name='Статус группы')
    start_date = models.DateTimeField(verbose_name='Дата начала')
    end_date = models.DateTimeField(verbose_name='Дата окончания')

    class Meta:
        verbose_name = 'Группа трейдера'
        verbose_name_plural = 'Группы трейдеров'

    def __str__(self):
        return f"{self.trader} : {self.title} : {self.id}"


class Membership(models.Model):
    """Модель членства инвесторов в TradeGroup"""
    investor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='memberships')
    group = models.ForeignKey(TradeGroup, on_delete=models.SET_NULL, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    invested_sum = models.PositiveSmallIntegerField(verbose_name="Инвестированная сумма")

    class Meta:
        verbose_name = 'Членство в группе'
        verbose_name_plural = 'Членства в группах'

    def __str__(self):
        return f'{self.group} : {self.investor}'
