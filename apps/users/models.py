import decimal
import jwt

from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.utils import timezone
from django.conf import settings

from datetime import datetime, timedelta

from .regexs import inn_regex

import random


class User(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name='Почта')
    phone_number = models.CharField(max_length=50, unique=True, verbose_name='Номер телефона', null=True, blank=True)

    code = models.CharField(max_length=6, verbose_name='Активационный код', blank=True)
    tg_chat_id = models.CharField(max_length=30, blank=True, verbose_name='ID чата в телеграме ')

    is_active = models.BooleanField(default=False, verbose_name='Активный')
    is_trader = models.BooleanField(default=False, verbose_name='Трейдер')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.email}'

    # def generate_code(self):
    #     """Генерируем активационный код"""
    #     nums = [i for i in range(10)]
    #     code_items = []
    #
    #     for i in range(6):
    #         num = random.choice(nums)
    #         code_items.append(num)
    #
    #     code_string = ''.join(str(item) for item in code_items)
    #     self.code = code_string

    # @property
    # def token(self):
    #     return self._generate_jwt_token()
    #
    # def _generate_jwt_token(self):
    #
    #     dt = datetime.now() + timedelta(days=60)
    #     token = jwt.encode({
    #         'id': self.pk,
    #         'exp': int(dt.strftime('%s'))
    #     }, settings.SECRET_KEY, algorithm='HS256')
    #
    #     return token.decode('utf-8')


class Trader(models.Model):
    """Модель Трейдера"""
    user = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='trader',
                                verbose_name='Пользователь', null=True)
    verified = models.BooleanField(default=False, verbose_name='Верификация')

    class Meta:
        verbose_name = 'Трейдер'
        verbose_name_plural = 'Трейдеры'

    def __str__(self):
        return f"{self.user}"


class Document(models.Model):
    """Документ для верификации трейдера"""

    class Status(models.TextChoices):
        ACCEPTED = 'accepted', 'принято'
        REFUSED = 'refused', 'отклонено'
        ON_CONSIDERATION = 'on_consideration', 'на рассмотрении'

    status = models.CharField(max_length=25, choices=Status.choices, default=Status.ON_CONSIDERATION)
    trader = models.OneToOneField(Trader, on_delete=models.SET_NULL, related_name='document', null=True)
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия')
    birth_day = models.DateField(verbose_name='Дата рождения')
    passport_number = models.CharField(max_length=100, unique=True, verbose_name='Номер паспорта')
    inn = models.CharField(max_length=14, unique=True,
                           verbose_name='Инн')
    country = models.CharField(max_length=100, verbose_name='Страна проживания')
    city = models.CharField(max_length=100, verbose_name='Город')
    address = models.CharField(max_length=255, verbose_name='Адрес')

    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документы'

    def __str__(self):
        return f"{self.trader}"


class DocumentImage(models.Model):

    document = models.ForeignKey(Document, on_delete=models.SET_NULL, related_name='images', null=True)
    image = models.ImageField(upload_to=f'document/%y/%m/%d/', verbose_name='Фото', blank=True)

    class Meta:
        verbose_name = 'Фото документа'
        verbose_name_plural = 'Фото документов'


class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Пользователь', related_name='balance')
    balance = models.DecimalField(default=0, max_digits=7, decimal_places=2,
                                  verbose_name='Баланс пользователя')

    class Meta:
        verbose_name = 'Баланс'
        verbose_name_plural = 'Балансы'

    def __str__(self):
        return f'{self.user} - {self.balance}'


class Rating(models.Model):

    class RatingStarChoices(models.IntegerChoices):
        ONE = 1, '1'
        TWO = 2, '2'
        THREE = 3, '3'
        FOUR = 4, '4'
        FIVE = 5, '5'
        SIX = 6, '6'
        SEVEN = 7, '7'
        EIGHT = 8, '8'
        NINE = 9, '9'
        TEN = 10, '10'

    star = models.PositiveSmallIntegerField(choices=RatingStarChoices.choices, verbose_name='Оценка')
    trader = models.ForeignKey(Trader, on_delete=models.CASCADE,
                               related_name='ratings', verbose_name='Оцененный трейдер')
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, verbose_name='Пользователь поставивший оценку')
