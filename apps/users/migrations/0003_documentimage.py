# Generated by Django 4.0.3 on 2022-04-09 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_balance'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='document/%y/%m/%d/', verbose_name='Фото')),
                ('document', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images', to='users.document')),
            ],
            options={
                'verbose_name': 'Фото документа',
                'verbose_name_plural': 'Фото документов',
            },
        ),
    ]
