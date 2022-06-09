from django.core.mail import EmailMessage
from google.auth.transport import requests
from google.oauth2 import id_token
from django.contrib.auth import authenticate
from base.models import User
from django.utils import timezone
import requests as req
import os
import random
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class Util:
    def SendDynamic(data):
        TEMPLATES = ['d-c88217f162ff487693df541c32cf8ec0', 'd-96e8c4184a4b427489de4dbf7b9d6c80']

        FROM_EMAIL = ('kyky0100@gmail.com', 'Cristian Fleancu')
        TEMPLATE_ID = TEMPLATES[1] if data['reason'] == 'register' else TEMPLATES[0] if data['reason'] == 'reset' else None
        TO_EMAILS = [(data['to_email'], data['username']),]
        message = Mail(
            from_email=FROM_EMAIL,
            to_emails=TO_EMAILS)

        message.dynamic_template_data = {
            'user': f'{data["username"]}',
            'url': f'{data["link"]}',
        }
        message.template_id = TEMPLATE_ID
        try:
            sg = SendGridAPIClient(os.getenv('SENDGRID_API'))
            response = sg.send(message)
            code, body, headers = response.status_code, response.body, response.headers
        except Exception as e:
            print("Error: {0}".format(e))
        return str(response.status_code)

def register_social_user(provider, user_id, email, name):
        filtered_user_by_email = User.objects.filter(email=email)
        if filtered_user_by_email.exists():
            if not filtered_user_by_email[0].is_active:
                raise PermissionDenied(detail=403)
            if provider == filtered_user_by_email[0].auth_provider:
                
                registered_user = authenticate(
                    email=email, password=os.getenv('SOCIAL_SECRET'))
                registered_user.last_login = timezone.now()
                registered_user.save(update_fields=["last_login"])
                return {
                    'username': registered_user.username,
                    'email': registered_user.email,
                    'access': str(registered_user.access()),
                    'refresh': str(registered_user.refresh()),
                }
            
            else:
                raise AuthenticationFailed(
                    detail=401
                )
        else:
            user = {
                'username': generate_username(name), 'email': email,
                'password': os.getenv('SOCIAL_SECRET'), 'user_type': '1'}
            user = User.objects.create_user(**user)
            user.is_verified = True
            user.auth_provider = provider
            user.save()
            new_user = authenticate(
                email=email, password=os.getenv('SOCIAL_SECRET')
            )
            return {
                'email': new_user.email,
                'username': new_user.username,
                'access': str(new_user.access()),
                'refresh': str(new_user.refresh()),
            }

def generate_username(name):

    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return generate_username(random_username)

class Google:
    # Google class to fetch user info and return it
    @staticmethod
    def validate(auth_token):
        try:
            idinfo = id_token.verify_oauth2_token(
                auth_token, requests.Request(), clock_skew_in_seconds=5)
            
            if 'accounts.google.com' in idinfo['iss']:
                return idinfo
        except:
            return 'Token error in util'