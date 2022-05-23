from django.db.models.signals import post_save
from django.dispatch import receiver
from django_otp.plugins.otp_totp.models import TOTPDevice

from .models import User, Balance


@receiver(post_save, sender=User)
def create_balance_for_user(instance: User, created, **kwargs):
    if created:
        Balance.objects.create(user=instance)


@receiver(post_save, sender=TOTPDevice)
def activate_totp_for_user(instance:TOTPDevice, created, **kwargs):
    if created:
        instance.user.otp_for_login = True
        instance.user.otp_for_withdraw = True
        instance.user.save()
