# Generated by Django 4.0.3 on 2022-07-17 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_alter_propertyitem_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyitem',
            name='price',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
