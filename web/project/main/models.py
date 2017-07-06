from __future__ import unicode_literals
import json
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

class Symptoms(models.Model):
    # record input symptoms
    s1 = models.CharField(max_length=20, blank=True)
    s2 = models.CharField(max_length=20, blank=True)
    s3 = models.CharField(max_length=20, blank=True)

    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name="user")


# Model to extend User class on the creation of a new patient
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient')
    doctor = models.CharField(max_length=50, blank=True)
    diagnosis = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    mobile = models.CharField(max_length=10, blank=True)


####################################################################
#                      TESTING DATABASE DESIGN                     #
####################################################################

# Model to store questions and answers from the user
class Questionnaire(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


# Model to associate questions with answers
class Question(models.Model):
    record = models.ForeignKey(Questionnaire)
    question = models.CharField(max_length=500, blank=True, help_text='Enter question text here')

    def __str__(self):
        return self.question


# Model to get answers from the user
class Answer(models.Model):
    answer = models.IntegerField()
    record = models.ForeignKey(Questionnaire)
    question = models.ForeignKey(Question)

    # Field to enter answer to first question
    text = models.CharField(max_length=1500, blank=True)

    # To be computed but left blank for now
    # score = models.IntegerField()