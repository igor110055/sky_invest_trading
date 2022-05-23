from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User, Balance


@receiver(post_save, sender=User)
def create_balance_for_user(instance: User, created, **kwargs):
    if created:
        Balance.objects.create(user=instance)
