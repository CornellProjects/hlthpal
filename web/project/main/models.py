from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


#class Country(models.Model):
# sector name
# sector code


#class Sector(models.Model):
# sector name
# sector code


#class Notes(models.Model):
#id
#data
#foreignkey symptoms table


# Create a model for symptoms table
class Symptoms(models.Model):
    s1 = models.CharField(max_length=10)
    s2 = models.CharField(max_length=10)
    s3 = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name="user")
    #owner = models.ForeignKey('auth.User', related_name="user", on_delete=models.CASCADE)