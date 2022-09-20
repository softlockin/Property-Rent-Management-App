from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


class UserManager(BaseUserManager):
    def create_user(self, username, email, user_type, password=None):
        if email is None:
            raise TypeError('Email is mandatory')
        if username is None:
            raise TypeError('Username is mandatory')
        
        user=self.model(username=username, email=self.normalize_email(email), user_type=user_type)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None, user_type='1'):
        if password is None:
            raise TypeError('Password should not be empty!')
        if username is None:
            raise TypeError('Username is mandatory')
        
        user=self.create_user(username, email, user_type, password)
        user.is_superuser = True
        user.is_staff = True
        user.username = username
        user.save()
        return user

AUTH_PROVIDERS = {'google': 'google', 'email': 'email'}

class User(AbstractBaseUser, PermissionsMixin):

    USER_TYPES = (
        (1, 'OWNER'),
        (2, 'TENANT')
    )

    username = models.CharField(max_length=30, unique=True, db_index=True)
    email = models.EmailField(max_length=55, unique=True, db_index=True)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPES, default=2)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=255, blank=False, null=False, default=AUTH_PROVIDERS['email'])
    gapi_user_type_set = models.BooleanField(default=False, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def access(self):
        refresh = RefreshToken.for_user(self)
        refresh['email'] = self.email
        refresh['username'] = self.username
        refresh['user_type'] = self.user_type
        refresh['gapi_user_type_set'] = self.gapi_user_type_set
        refresh['provider'] = self.auth_provider

        return refresh.access_token
        
    def refresh(self):
        refresh = RefreshToken.for_user(self)
        refresh['email'] = self.email
        refresh['username'] = self.username
        refresh['user_type'] = self.user_type
        refresh['gapi_user_type_set'] = self.gapi_user_type_set
        refresh['provider'] = self.auth_provider

        return refresh
    
class PropertyItem(models.Model):

    CURRENCY = (
        (1, 'EUR'),
        (2, "LEI")
    )

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30)
    price = models.PositiveIntegerField(null=False)
    rent_due_day = models.PositiveIntegerField(validators=[
        MinValueValidator(1),
        MaxValueValidator(31)], blank=True, default=1)
    currency = models.PositiveSmallIntegerField(choices=CURRENCY, default=2)
    address = models.TextField(max_length=256, null=False)
    city = models.TextField(max_length=50, null=False)
    tenant = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='tenant', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class RentInvoice(models.Model):
    property_id = models.PositiveSmallIntegerField(blank=False)
    property_name = models.CharField(max_length=30, null=True)
    owner_id = models.PositiveSmallIntegerField(blank=False)
    tenant_id = models.PositiveSmallIntegerField(blank=False)
    price = models.PositiveIntegerField()
    currency = models.CharField(blank=False, max_length=4, default='LEI')
    created_at = models.DateField(auto_now_add=True)
    due_day = models.DateField()
    paid = models.BooleanField(default=False)
    
class Issue(models.Model):
    name = models.CharField(max_length=25, null=False)
    linked_to_property = models.ForeignKey(PropertyItem, on_delete=models.CASCADE)
    property_name = models.CharField(max_length=30, null=True)
    description = models.TextField(max_length=256, null=False)
    closed = models.BooleanField(default=False, null=False)
    property_owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    cost = models.PositiveIntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class OwnerSummary(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    properties_listed = models.PositiveSmallIntegerField(default=0)
    income = models.PositiveIntegerField(default=0)
    expenses = models.PositiveIntegerField(default=0)
    open_issues = models.PositiveSmallIntegerField(default=0)
    overdue = models.PositiveSmallIntegerField(default=0)
    
    def __str__(self):
        return str(self.user)