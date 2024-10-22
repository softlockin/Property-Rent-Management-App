from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (SummaryFetchView, IssueAPIView, EditIssueAPIView, PasswordResetAPIView, GapiUserTypeView, 
    ForgotPasswordAPIView, MyTokenObtainPairView, RegisterAPIView, 
    VerifyEmail, LoginAPIView, PropertyListAPIView, PropertyAPIView,
    GoogleAuthView, LinkUserToPropertyRequestAPIView, MapAPIView,
    AcceptLinkUserToPropertyRequestAPIView, RentInvoiceAPIView, IssueMessageAPIView)
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('verify-email/', VerifyEmail.as_view(), name='email-verify'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot-password'),
    path('reset-password/', PasswordResetAPIView.as_view(), name='password-reset'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('login/google/', GoogleAuthView.as_view(), name='google-login'),
    path('property-items/', PropertyListAPIView.as_view(), name='get-property-list'),
    path('invoices/', RentInvoiceAPIView.as_view(), name='get-invoices-list'),
    path('property/<str:pk>/', PropertyAPIView.as_view(), name='property-details'),
    path('usertype-set/', GapiUserTypeView.as_view(), name='usertype-set'),
    path('fetch-summary/', SummaryFetchView.as_view(), name='fetch-summary'),
    path('link-request/', LinkUserToPropertyRequestAPIView.as_view(), name='link-request' ),
    path('accept-request/', AcceptLinkUserToPropertyRequestAPIView.as_view(), name='accept-request'),
    path('issues/', IssueAPIView.as_view(), name='get-issues-list'),
    path('issue/<str:pk>/', EditIssueAPIView.as_view(), name='edit-issue'),
    path('issue/<str:pk>/message/', IssueMessageAPIView.as_view(), name='add-message'),
    path('map/', MapAPIView.as_view(), name='map'),
]