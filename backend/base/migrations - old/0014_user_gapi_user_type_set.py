# Generated by Django 4.0.3 on 2022-06-13 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_user_auth_provider'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='gapi_user_type_set',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
