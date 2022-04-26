# Generated by Django 4.0.3 on 2022-04-19 11:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0006_remove_user_city_alter_document_birth_day'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('invested_sum', models.PositiveSmallIntegerField(verbose_name='Инвестированная сумма')),
            ],
        ),
        migrations.CreateModel(
            name='TradeGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('slug', models.SlugField(default=uuid.uuid4, max_length=150, unique=True)),
                ('description', models.CharField(max_length=500)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('group_size', models.PositiveSmallIntegerField(default=5, verbose_name='Максимальное количество инвесторов')),
                ('need_sum', models.PositiveSmallIntegerField(verbose_name='Необходимая сумма')),
                ('min_entry_sum', models.PositiveSmallIntegerField(verbose_name='Минимальная сумма входа')),
                ('max_entry_sum', models.PositiveSmallIntegerField(verbose_name='Максимальная сумма входа')),
                ('investors', models.ManyToManyField(through='copytrade.Membership', to=settings.AUTH_USER_MODEL, verbose_name='Инвесторы')),
                ('trader', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='groups', to='users.trader', verbose_name='Создатель')),
            ],
            options={
                'verbose_name': 'Группа трейдера',
                'verbose_name_plural': 'Группы трейдеров',
            },
        ),
        migrations.AddField(
            model_name='membership',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='copytrade.tradegroup'),
        ),
        migrations.AddField(
            model_name='membership',
            name='investor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
