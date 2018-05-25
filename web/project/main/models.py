from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils import timezone


# Model to determine where a doctor is from
class Entity(models.Model):
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Model to map sectors
# class Sector(models.Model):
#         sector = models.CharField(
#             max_length=255,
#         )
#
#         def __str__(self):
#             return self.question


# Model to extend User class on the creation of a new doctor
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor')
    entity = models.ForeignKey(Entity)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name


# Model to extend User class on the creation of a new patient
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient')
    # doctor = models.ForeignKey(Doctor)
    doctor = models.CharField(max_length=100)
    care_giver = models.CharField(max_length=100)
    diagnosis = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    mobile = models.CharField(max_length=10, blank=True)
    street = models.CharField(max_length=200)
    sector = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)


# Model to associate questions with answers
class Question(models.Model):
    question = models.CharField(
        max_length=255,
        blank=True,
        help_text='Enter question text here'
    )

    def __str__(self):
        return self.question


# Model to store questions and answers from the user
class Record(models.Model):
    date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    score = models.IntegerField()
    created_date = models.DateTimeField(null=True, blank=True)
    signed = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True, blank=True, related_name='signed_user')


# Model to get answers from the user
class Answer(models.Model):
    # text field is used to enter answer to first question
    text = models.CharField(max_length=255, blank=True)
    answer = models.IntegerField()
    question = models.ForeignKey(Question)
    record = models.ForeignKey(Record)

    # we only want to accept one answer per question per Record
    # class Meta:
    #     unique_together = ["record", "question"]


# Model to store symptoms from the user
class Symptom(models.Model):
    symptom = models.CharField(max_length=255)
    answer = models.IntegerField()
    record = models.ForeignKey(Record)


#########################################################################
# Models for priviliged user access
# Model to store notes on patients on the dashboard
class Notes(models.Model):
    date = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, related_name='notes_author');
    patient = models.ForeignKey(User, related_name='notes_patient');
    notes = models.CharField(max_length=255)
    # Track morphine medication
    dosage = models.IntegerField(null=True)


