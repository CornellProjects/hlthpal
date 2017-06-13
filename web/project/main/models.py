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
    s0 = models.CharField(max_length=10, default='Pain')
    s1 = models.CharField(max_length=10, default='Shortness of breath')
    s2 = models.CharField(max_length=10, default='Weakness or lack of energy')
    s3 = models.CharField(max_length=50, default='Nausea')
    s4 = models.CharField(max_length=10, default='Vomiting')
    s5 = models.CharField(max_length=10, default='Poor appetite')
    s6 = models.CharField(max_length=10, default='Constipation')
    s7 = models.CharField(max_length=10, default='Sore or dry mouth')
    s8 = models.CharField(max_length=10, default='Drowsiness')
    s9 = models.CharField(max_length=10, default='Poor mobility')

    # symptoms listed by the patient; allowed to leave blank
    s10 = models.CharField(max_length=10, blank=True)
    s11 = models.CharField(max_length=10, blank=True)
    s12 = models.CharField(max_length=10, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name="user")
    #owner = models.ForeignKey('auth.User', related_name="user", on_delete=models.CASCADE)


# Create a model for symptoms in question Q2
# Range 0-4 on: Not at all, Slightly, Moderately, Severely, Overwhelmingly
class ExperienceOne(models.Model):
    # choices to be selected by patient
    RATE_NUMBER = (
        ('0','Not at all'),
        ('1','Slightly'),
        ('2','Moderately'),
        ('3','Severely'),
        ('4','Overwhelmingly'),
    )
    rate = models.IntegerField()
    symptom = models.ForeignKey(Symptoms)
    owner = models.ForeignKey('auth.User', related_name="symptoms_owner")


class QThreeFive(models.Model):
    question = models.CharField(max_length=100)


# Create a model for questions Q3-Q5
# Range 0-4 on: Not at all, Occasionally, Sometimes, Most of the time, Always
class ExperienceTwo(models.Model):
    # choices to be selected by patient
    EXPERIENCE_CHOICES = (
        ('0','Not at all'),
        ('1','Occasionally'),
        ('2','Sometimes'),
        ('3','Most of the time'),
        ('4','Always'),
    )
    experience = models.IntegerField()
    question = models.ForeignKey(QThreeFive)


class QSixEight(models.Model):
    question = models.CharField(max_length=100)


# Create a model for questions Q6-Q8
# Range 0-4 on: Always, Most of the time, Sometimes, Occasionally, Not at all
class ExperienceThree(models.Model):
    # choices to be selected by patient
    FEELING_CHOICES = (
        ('0','Always'),
        ('1','Most of the time'),
        ('2','Sometimes'),
        ('3','Occasionally'),
        ('4','Not at all'),
    )
    feeling = models.IntegerField()
    question = models.ForeignKey(QSixEight)


class QNine(models.Model):
    question = models.CharField(max_length=100)


# Create a model for question Q9
# Range 0-4 on: Problems addressed/No problems, Problems mostly addressed, Problems partly addressed,
# Problems hardly addressed, Problems not addressed
class Problems(models.Model):
    # choices to be selected by patient
    FEELING_CHOICES = (
        ('0','Problems addressed/No problems'),
        ('1','Problems mostly addressed'),
        ('2','Problems partly addressed'),
        ('3','Problems hardly addressed'),
        ('4','Problems not addressed'),
    )
    problems = models.IntegerField()
    question = models.ForeignKey(QNine)



