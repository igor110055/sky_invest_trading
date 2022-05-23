# Generated by Django 4.0.3 on 2022-05-23 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_banner'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='otp_for_login',
            field=models.BooleanField(default=False, verbose_name='2fa аутентификация для входа'),
        ),
        migrations.AddField(
            model_name='user',
            name='otp_for_withdraw',
            field=models.BooleanField(default=False, verbose_name='2fa аутентификация для вывода'),
        ),
    ]
