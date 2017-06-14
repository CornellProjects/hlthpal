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
    # record input symptoms
    s1 = models.CharField(max_length=20)
    s2 = models.CharField(max_length=20)
    s3 = models.CharField(max_length=20)

    # record rating of each symptom
    r1 = models.IntegerField()
    r2 = models.IntegerField()
    r3 = models.IntegerField()

    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name="user")
    #owner = models.ForeignKey('auth.User', related_name="user", on_delete=models.CASCADE)