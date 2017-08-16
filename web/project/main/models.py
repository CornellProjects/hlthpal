from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils import timezone


# Model to determine where a doctor is from
class Entity(models.Model):
    name = models.CharField(max_length=1000)
    street = models.CharField(max_length=1000)
    city = models.CharField(max_length=1000)
    state = models.CharField(max_length=1000)
    country = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


# Model to extend User class on the creation of a new doctor
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor')
    entity = models.ForeignKey(Entity)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name


# Model to extend User class on the creation of a new patient
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient')
    doctor = models.ForeignKey(Doctor)
    care_giver = models.CharField(max_length=100)
    diagnosis = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    mobile = models.CharField(max_length=10, blank=True)
    street = models.CharField(max_length=1000)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)


# Model to store notes on patients on the dashboard
class Note(models.Model):
    owner = models.ForeignKey(Doctor)
    patient = models.ManyToManyField(Patient)
    text_field = models.CharField(max_length=2500)


# Model to associate questions with answers
class Question(models.Model):
    question = models.CharField(
        max_length=500,
        blank=True,
        help_text='Enter question text here'
    )

    def __str__(self):
        return self.question


# Model to get answers from the user
class Answer(models.Model):
    # text field is used to enter answer to first question
    text = models.CharField(max_length=1500, blank=True)
    answer = models.IntegerField(null=True)
    question = models.ForeignKey(Question)


# Model to store questions and answers from the user
class Questionnaire(models.Model):
    date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    answers = models.ManyToManyField(Answer)
