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


class Entity(models.Model):
    name = models.CharField(max_length=1000)
    street = models.CharField(max_length=1000)
    city = models.CharField(max_length=1000)
    state = models.CharField(max_length=1000)
    country = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor')
    entity = models.ForeignKey(Entity)


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


class Note(models.Model):
    owner = models.ForeignKey(Doctor)
    patient = models.ManyToManyField(Patient)
    text_field = models.CharField(max_length=2500)


# Model to associate questions with answers
class Question(models.Model):
    question = models.CharField(
        max_length=500,
        blank=True,
        help_text='Enter question text here',
        unique=True
    )

    def __str__(self):
        return self.question


# Model to store questions and answers from the user
class Questionnaire(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)


# Model to get answers from the user
class Answer(models.Model):
    # text field is used to enter answer to first question
    text = models.CharField(max_length=1500, blank=True)
    answer = models.IntegerField(null=True,blank=True)
    question = models.ForeignKey(Question, to_field='question')
    record = models.ForeignKey(Questionnaire)

    def __str__(self):
        return str(self.answer)



