# Generated by Django 4.0.3 on 2022-09-27 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_rentinvoice_property_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyitem',
            name='tenant_email',
            field=models.CharField(max_length=56, null=True),
        ),
    ]