# Generated by Django 4.0.3 on 2022-05-23 21:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_user_otp_for_login_user_otp_for_withdraw'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='trader',
        ),
        migrations.RemoveField(
            model_name='trader',
            name='verified',
        ),
        migrations.AddField(
            model_name='document',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='document', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='trader',
            name='binance_api_key',
            field=models.CharField(blank=True, max_length=100, verbose_name='API ключ от аккаунта в binance'),
        ),
        migrations.AddField(
            model_name='user',
            name='verified',
            field=models.BooleanField(default=False, verbose_name='Верификация'),
        ),
        migrations.AlterField(
            model_name='user',
            name='tg_chat_id',
            field=models.CharField(blank=True, max_length=30, verbose_name='ID чата в телеграмме '),
        ),
    ]
