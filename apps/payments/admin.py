from django.contrib import admin

from .models import PaymentOrder


@admin.register(PaymentOrder)
class PaymentOrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'paid']
    list_display_links = list_display
