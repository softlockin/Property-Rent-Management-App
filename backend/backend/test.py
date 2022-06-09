from django.http import Http404
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import update_last_login
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, Token
from .serializers import PasswordResetSerializer, ForgotPasswordSerializer, MyTokenObtainPairSerializer, ActivationLinkResendSerializer, RegisterSerializer, EmailVerificationSerializer, LoginSerializer, PropertyListSerializer, PropertySerializer, GoogleAuthSerializer
from base.models import User, PropertyItem
from .utils import Util
import jwt
from django.conf import settings

user = User.objects.get(email='kyky0100@gmail.com')
token = RefreshToken.for_user(user).access_token