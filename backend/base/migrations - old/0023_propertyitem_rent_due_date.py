# Generated by Django 4.0.3 on 2022-07-21 17:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0022_alter_propertyitem_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyitem',
            name='rent_due_date',
            field=models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(31)]),
        ),
    ]