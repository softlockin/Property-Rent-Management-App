from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib import auth
import json
import os
from base.models import User, PropertyItem, OwnerSummary, RentInvoice, Issue
from base.api.utils import Google, register_social_user, generate_username
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response


class PropertyListSerializer(ModelSerializer):
    class Meta:
        model = PropertyItem
        fields= '__all__'

class SummaryFetchSerializer(ModelSerializer):
    class Meta:
        model = OwnerSummary
        fields= '__all__'

class PropertySerializer(ModelSerializer):
    class Meta:
        model = PropertyItem
        fields= '__all__'

class SetTypeAfterGapiLogin(ModelSerializer):
    user_type = serializers.ChoiceField(User.USER_TYPES)

    class Meta:
        model = User
        fields = ['user_type']    

class RegisterSerializer(ModelSerializer):
    user_type = serializers.ChoiceField(User.USER_TYPES)
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'user_type', 'password']
        extra_kwargs = {
            "email": {
                "validators": [
                    UniqueValidator(
                       queryset=User.objects.all(),
                       message="Email already in use."
                    )
                ]
            },
            "username": {
                "validators": [
                    UniqueValidator(
                       queryset=User.objects.all(),
                       message="Username already in use."
                    )
                ]
            },
        }

    def create(self, validated_data):
        return User.objects.create_user( validated_data['username'].lower(), validated_data['email'].lower(), validated_data['user_type'], validated_data['password'] )



class EmailVerificationSerializer(ModelSerializer):
    token = serializers.CharField(max_length=555, read_only=True)
    email = serializers.CharField(max_length=128, min_length=3, write_only=True)

    class Meta:
        model = User
        fields = ['token', 'email']

class ForgotPasswordSerializer(ModelSerializer):
    email = serializers.CharField(max_length=128, min_length=3)

    class Meta:
        model = User
        fields = ['email']

class PasswordResetSerializer(ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['password']

class LinkUserToPropertyRequestSerializer(ModelSerializer):
    property_id = serializers.IntegerField(min_value=1)
    email = serializers.EmailField(max_length=128, min_length=3)
    due_day = serializers.IntegerField(min_value=1, max_value=31)

    class Meta:
        model = PropertyItem
        fields = ['property_id', 'email', 'due_day']

class AcceptLinkUserToPropertySerializer(ModelSerializer):
    property_id = serializers.IntegerField(min_value=1)
    email = serializers.EmailField(max_length=128, min_length=3)
    due_day = serializers.IntegerField(min_value=1, max_value=31)
    
    class Meta:
        model = PropertyItem
        fields = ['property_id', 'email', 'due_day']

class LoginSerializer(ModelSerializer):
    email = serializers.EmailField(max_length=128, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    access = serializers.CharField(max_length=555, min_length=3, read_only=True)
    refresh = serializers.CharField(max_length=555, min_length=3, read_only=True)

    class Meta:
        model = User 
        fields = ['email', 'password', 'access', 'refresh']

class IssueSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'


class RentInvoiceSerializer(ModelSerializer):
    paid = serializers.BooleanField(required=True)

    class Meta:
        model = RentInvoice
        fields = '__all__'

class GoogleAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'Token error in ser'
            )
        if user_data['aud'] != os.getenv('GOOGLE_CID'):
            raise AuthenticationFailed('Not you!')
        
        user_id = user_data['sub']
        email = user_data['email']
        name = user_data['name']
        provider = 'google'
        return register_social_user(provider=provider, user_id=user_id, email=email, name=name)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
