# Generated by Django 4.0.3 on 2022-11-01 11:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0031_alter_issue_linked_to_property'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='linked_to_property',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.propertyitem'),
        ),
        migrations.AlterField(
            model_name='issue',
            name='property_owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]