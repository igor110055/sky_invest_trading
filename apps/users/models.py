import decimal

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

from .managers import UserManager
from .regexs import inn_regex

import random


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=150, verbose_name='Имя')
    last_name = models.CharField(max_length=150, verbose_name='Фамилия')
    phone_number = models.CharField(max_length=50, unique=True, verbose_name='Номер телефона', null=True, blank=True)
    city = models.CharField(max_length=255)
    code = models.CharField(max_length=6, verbose_name='Активационный код', blank=True)

    date_joined = models.DateTimeField(default=timezone.now, verbose_name='Дата регистрации')
    is_trader = models.BooleanField(default=False, verbose_name='Трейдер')
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def generate_code(self):
        """Генерируем активационный код"""
        nums = [i for i in range(10)]
        code_items = []

        for i in range(6):
            num = random.choice(nums)
            code_items.append(num)

        code_string = ''.join(str(item) for item in code_items)
        self.code = code_string

    def __str__(self):
        return f'{self.email}'


class Trader(models.Model):
    """Модель Трейдера"""
    user = models.OneToOneField(User, on_delete=models.SET_NULL, verbose_name='Пользователь', null=True)
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

    status = models.PositiveSmallIntegerField(choices=Status.choices, default=3)
    trader = models.OneToOneField(Trader, on_delete=models.SET_NULL, related_name='document', null=True)
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, verbose_name='Фамилия')
    birth_day = models.DateField()
    passport_number = models.CharField(max_length=100, unique=True, verbose_name='Номер паспорта')
    inn = models.CharField(max_length=14, unique=True,
                           validators=[inn_regex], verbose_name='Инн')
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

