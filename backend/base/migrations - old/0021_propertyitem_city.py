# Generated by Django 4.0.3 on 2022-07-18 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_alter_propertyitem_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyitem',
            name='city',
            field=models.TextField(default='', max_length=50),
        ),
    ]
