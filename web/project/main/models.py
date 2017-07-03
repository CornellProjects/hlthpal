from __future__ import unicode_literals

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

# Model to associate questions with answers
class Question(models.Model):
    user = models.ForeignKey('auth.User', related_name='owner')
    question = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return self.question


# Model to get answers from the user
class Answer(models.Model):
    ZERO = 0
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    RATING_CHOICES = (
        (ZERO,  'Not at all'),
        (ONE,   'Slightly'),
        (TWO,   'Moderately'),
        (THREE, 'Severely'),
        (FOUR,  'Overwhelmingly'),
    )
    answer = models.CharField(max_length=20, choices=RATING_CHOICES)
    date = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, related_name="answers")
