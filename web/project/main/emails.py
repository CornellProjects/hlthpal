import os
import datetime
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model
from django.views.generic import UpdateView
from rest_framework.authentication import TokenAuthentication
from django.utils.encoding import smart_str
from django.core.urlresolvers import reverse_lazy
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
from wsgiref.util import FileWrapper

User = get_user_model()

######################################################################################
def send_user_registration_emails(sender, instance, created, *args, **kwargs):
    if not created:
        # We don't want to send emails on all saves, just on create
        return

    #Email sent to admins
    sender = 'admin@hlthpal.com'
    admin_addresses = [email for name, email in settings.ADMINS]
    admin_subject = 'Admin Notification: New user registered'
    user_subject = 'Your registration was successful'
    admin_message = 'Hello,' + \
                    '\n\nThis is to inform you that a new user has been added to the hlthpal system. \n'\
                    '\n New member username: {}'.format(instance.username) + '\n\n Have a nice day!'
    user_message = 'Hello {},'.format(instance.first_name) + \
                   '\n\nYour registration has been completed. Your username is your email address. ' + \
                   'Please set a new password using the link below.' + \
                   '\n\n username: {}'.format(instance.username) + \
                   '\n Set password link: http://www.hlthpal.com/password-reset/' + '\n\n Thank you!'

    # Send notification to admin mailing list
    send_mail(
        from_email=sender,
        recipient_list=admin_addresses,
        subject=admin_subject,
        message=admin_message,
        fail_silently=False
    )

    # Send email to the new user
    send_mail(
        from_email=sender,
        recipient_list=[instance.email],
        subject=user_subject,
        message=user_message,
        fail_silently=False
    )

######################################################################################

