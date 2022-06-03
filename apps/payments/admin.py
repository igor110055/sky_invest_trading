from django.contrib import admin

from .models import PaymentOrder, PaymentOrderTether, Withdraw, Currency


@admin.register(PaymentOrder)
class PaymentOrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'status', 'created']
    list_display_links = list_display


@admin.register(PaymentOrderTether)
class PaymentOrderTetherAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'status', 'created']
    list_display_links = list_display


@admin.register(Withdraw)
class WithdrawAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'created', 'status']
    list_display_links = list_display


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ['name', 'value']
    list_display_links = list_display