# Generated by Django 4.0.3 on 2022-09-13 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_issue_cost'),
    ]

    operations = [
        migrations.AddField(
            model_name='rentinvoice',
            name='paid',
            field=models.BooleanField(default=False),
        ),
    ]