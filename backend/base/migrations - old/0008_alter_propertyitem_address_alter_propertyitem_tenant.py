# Generated by Django 4.0.3 on 2022-04-01 14:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_propertyitem_tenant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyitem',
            name='address',
            field=models.TextField(blank=True, default='', max_length=128),
        ),
        migrations.AlterField(
            model_name='propertyitem',
            name='tenant',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tenant', to=settings.AUTH_USER_MODEL),
        ),
    ]