# Generated by Django 4.0.3 on 2022-09-12 13:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_propertyitem_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='property_id',
            new_name='linked_to_property',
        ),
    ]
