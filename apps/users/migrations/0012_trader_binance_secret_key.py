# Generated by Django 4.0.3 on 2022-05-26 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_qa'),
    ]

    operations = [
        migrations.AddField(
            model_name='trader',
            name='binance_secret_key',
            field=models.CharField(blank=True, max_length=100, verbose_name='SECRET ключ от аккаунта binance'),
        ),
    ]