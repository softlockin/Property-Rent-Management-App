# Generated by Django 4.0.3 on 2022-12-21 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0037_propertyitem_rental_first_day'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyitem',
            name='owner_email',
            field=models.CharField(max_length=56, null=True),
        ),
    ]
