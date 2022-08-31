from rest_framework.decorators import api_view
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
from .serializers import LinkUserToPropertyRequestSerializer, SummaryFetchSerializer, PasswordResetSerializer, SetTypeAfterGapiLogin, ForgotPasswordSerializer, MyTokenObtainPairSerializer, RegisterSerializer, EmailVerificationSerializer, LoginSerializer, PropertyListSerializer, PropertySerializer, GoogleAuthSerializer
from base.models import User, PropertyItem, OwnerSummary
from .permissions import IsTenantPermission
from .utils import Util
from .owner_summary_creation import create_summary
import jwt
from django.conf import settings

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/token',
        'GET /api/token/refresh',
    ]
    return Response(routes)

@permission_classes([IsAuthenticated, IsTenantPermission])
class PropertyListAPIView(APIView):
    serializer_class = PropertyListSerializer

    def get(self, request):
        user = request.user
        if user.user_type == 2:
            try:
                property_item = PropertyItem.objects.get(tenant_id=user.id)
                serializer = PropertyListSerializer(property_item)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except PropertyItem.DoesNotExist:
                return Response({"error": "There is no property linked to this account."}, status=status.HTTP_404_NOT_FOUND)
            
        property_items = user.propertyitem_set.all().order_by("-updated_at")
        serializer = PropertyListSerializer(property_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        owner_summary = OwnerSummary.objects.get(user_id=user.id)
        request.data['owner'] = user.id
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            owner_summary.properties_listed += 1
            owner_summary.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class PropertyAPIView(APIView):
    def get_object(self, pk):
        
        try:
            return PropertyItem.objects.get(pk=pk)
        except PropertyItem.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = request.user
        property_item = self.get_object(pk)
        if property_item.owner.id == user.id:
            serializer = PropertySerializer(property_item, many=False)
            return Response(serializer.data)
        else:
            return Response("You are not authorized to view this property!", status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk):
        user = request.user
        property_item = self.get_object(pk)
        if property_item.owner.id == user.id:
            serializer = PropertySerializer(instance=property_item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("You are not authorized to modify this property!", status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk):
        user = request.user
        property_item = self.get_object(pk)
        if property_item.owner.id == user.id:
            property_item.delete()
            return Response("Property was deleted")
        else:
            return Response("You are not authorized to delete this property!", status=status.HTTP_401_UNAUTHORIZED)

@permission_classes([IsAuthenticated])
class LinkUserToPropertyRequestAPIView(APIView):
    serializer_class = LinkUserToPropertyRequestSerializer

    def post(self, request):
        data = request.data
        try:
            property_item = PropertyItem.objects.get(pk=data['property_id'])
            try:
                user = User.objects.get(email=data['email'])
                if request.user.id != property_item.owner_id:
                    return Response({'error': 'You are not the owner of this property!'}, status=status.HTTP_400_BAD_REQUEST)
                if user.user_type == 1:
                    return Response({'error': 'User not valid!'}, status=status.HTTP_400_BAD_REQUEST)
                if property_item.tenant_id != None:
                    return Response({'error': 'Property already has a tenant!'}, status=status.HTTP_400_BAD_REQUEST)
                serializer = self.serializer_class(data=data)
                if serializer.is_valid():
                    new_token = RefreshToken.for_user(user).access_token
                    link = 'http://localhost:3000/link-account/'+str(new_token) 
                    data={'to_email': user.email, 'link': link, 
                    'username': user.username, 'reason': 'user_link', 
                    'address': property_item.address+', '+property_item.city, 
                    'price': str(property_item.price)+(' EUR' if property_item.currency == 1 else ' LEI'), 
                    'due_day': data['due_day']}

                    Util.SendDynamic(data)

                return Response({'message': 'Email sent!'}, status=status.HTTP_200_OK)
            except:
                return Response({'error': 'User does not exist!'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'message': 'Something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid():
            serializer.save()
            user_data = serializer.data
            user = User.objects.get(email=user_data['email'].lower())

            # Owner summary DB record creation
            if user.user_type == 1:
                create_summary(user.id)

            token = RefreshToken.for_user(user).access_token
            token['email'] = user.email

            link = 'http://localhost:3000/activate-account/'+str(token) 
            data={'to_email': user.email, 'link': link, 'username': user.username, 'reason': 'register'}

            Util.SendDynamic(data)

            return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordAPIView(GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    
    def post(self, request):
        data = request.data
        email = data['email'].lower()
        if not User.objects.filter(email=email).first():
            return Response("User not found!", status=status.HTTP_404_NOT_FOUND)
        elif User.objects.filter(email=email)[0].auth_provider != 'email':
            return Response("You cannot reset the password because google login was used.", status=status.HTTP_403_FORBIDDEN)
        else:
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                user = User.objects.get(email=email)
                token = RefreshToken.for_user(user).access_token
                link = 'http://localhost:3000/reset-password/'+str(token)
                data={'to_email': user.email, 'link': link, 'username': user.username, 'reason': 'reset'}

                Util.SendDynamic(data)

                return Response('Password reset link sent!', status=status.HTTP_200_OK)

class PasswordResetAPIView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def put(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256', ])
            user = User.objects.get(id=payload['user_id'])
            password = request.data['password']
            user.set_password(password)
            user.save()
            
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Password reset link expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid link'}, status=status.HTTP_400_BAD_REQUEST)

        
        return Response('Password changed!', status=status.HTTP_200_OK)


class VerifyEmail(APIView):
    serializer_class = EmailVerificationSerializer

    def get(self,request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256', ])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation link expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid link'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data
        try:
            email = data['email']
            if User.objects.get(email=email).is_verified:
                return Response({'message': 'Email already verified!'}, status=status.HTTP_200_OK)
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                user = User.objects.get(email=email)
                new_token = RefreshToken.for_user(user).access_token
                link = 'http://localhost:3000/activate-account/'+str(new_token) 
                data={'to_email': user.email, 'link': link, 'username': user.username, 'reason': 'register'}

                Util.SendDynamic(data)

                return Response({'message': 'Email sent!'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)
            

class LoginAPIView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get('email').lower()
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if not user:
            return Response({'error': 'Your authentication information is incorrect. Please try again.'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_verified:
            return Response({'error':'Email is not verified!'}, status=status.HTTP_401_UNAUTHORIZED)
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
class GapiUserTypeView(GenericAPIView):
    serializer_class = SetTypeAfterGapiLogin

    def post(self, request):
        user = request.user
        data = request.data
        if user.gapi_user_type_set == True:
            return Response({"error": "User type already set for this account."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            user.user_type = data['user_type']
            user.gapi_user_type_set = True

            # Owner summray DB record creation
            if user.user_type == 1:
                create_summary(user.id)

            user.save()
            return Response({
                'access': str(user.access()),
                'refresh': str(user.refresh()),
                'email': user.email,
            }, status=status.HTTP_200_OK)
        else:
            return Response('Bad request', status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class SummaryFetchView(GenericAPIView):
    def get(self, request):
        try:
            summary = OwnerSummary.objects.get(user_id=request.user.id)
            serializer = SummaryFetchSerializer(summary)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error": "No summary for this account!"}, status=status.HTTP_200_OK)

class GoogleAuthView(GenericAPIView):
    serializer_class = GoogleAuthSerializer

    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = (serializer.validated_data)['auth_token']
        return Response(data, status=status.HTTP_200_OK)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
