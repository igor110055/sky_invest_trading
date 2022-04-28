# Generated by Django 4.0.3 on 2022-04-28 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('actions', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='action_type',
            field=models.CharField(choices=[('copy', 'Копирование трейдера'), ('top_up_balance', 'Пополнение баланса'), ('withdraw', 'Вывод'), ('join_group', 'Присоединение к группе'), ('create_group', 'Создание группы')], max_length=30, verbose_name='Тип действия'),
        ),
    ]
