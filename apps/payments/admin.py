from django.contrib import admin

from .models import PaymentOrder, PaymentOrderTether


@admin.register(PaymentOrder)
class PaymentOrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'paid']
    list_display_links = list_display


@admin.register(PaymentOrderTether)
class PaymentOrderTetherAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'paid']
    list_display_links = list_display
