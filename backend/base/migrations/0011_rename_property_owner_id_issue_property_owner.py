# Generated by Django 4.0.3 on 2022-09-13 11:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_issue_property_owner_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='property_owner_id',
            new_name='property_owner',
        ),
    ]