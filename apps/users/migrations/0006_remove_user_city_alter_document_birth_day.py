# Generated by Django 4.0.3 on 2022-04-19 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_document_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='city',
        ),
        migrations.AlterField(
            model_name='document',
            name='birth_day',
            field=models.DateField(verbose_name='Дата рождения'),
        ),
    ]
