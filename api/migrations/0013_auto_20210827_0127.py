# Generated by Django 3.2.5 on 2021-08-27 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20210827_0126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='birthday',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='firstName',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gmail',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='lastName',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='professionalTitle',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
