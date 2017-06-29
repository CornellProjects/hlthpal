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
from django.db.models.signals import post_save
from django.dispatch import receiver


class Symptoms(models.Model):
    # record input symptoms
    s1 = models.CharField(max_length=20, blank=True)
    s2 = models.CharField(max_length=20, blank=True)
    s3 = models.CharField(max_length=20, blank=True)

    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name="user")
    #owner = models.ForeignKey('auth.User', related_name="user", on_delete=models.CASCADE)


# Model to extend User class on the creation of a new patient
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient')
    doctor = models.CharField(max_length=50, blank=True)
    diagnosis = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    mobile = models.CharField(max_length=10, blank=True)


class Record(models.Model):
    owner = models.ForeignKey('auth.User')
    rating = models.IntegerField(blank=True)
    records = models.ManyToManyField("self")


class Question(models.Model):
    record = models.ForeignKey(Record)
    question = models.CharField(max_length=1000, blank=True)
    questions = models.ManyToManyField("self")


class Answers(models.Model):
    question = models.ForeignKey(Question)
    rating = models.IntegerField(blank=True)
    ratings = models.ManyToManyField("self")


class TextInput(models.Model):
    question = models.ForeignKey(Question)
    input = models.CharField(max_length=1000)
