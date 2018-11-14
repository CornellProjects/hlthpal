from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import serializers, exceptions, permissions
from rest_framework.serializers import (ModelSerializer, EmailField, CharField, ListSerializer)
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model
from django.db.models import Q
from itertools import chain

# Custom models
from .models import Patient, Doctor, Question, Answer, Record, Entity, Symptom, Notes

######################################################################################
# Serializers for user object
User = get_user_model()

# Create Patient Serializer
class PatientCreateSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id',
            'mobile',
            'diagnosis',
            'doctor',
            'gender',
            'address',
            'sector',
            'category',
            'referral',
            'care_giver'
        ]


class EntityCreateSerializer(ModelSerializer):
    class Meta:
        model = Entity
        fields = [
            'name',
            'street',
            'city',
            'state',
            'country'
        ]


# New user register serializer
class UserCreateSerializer(ModelSerializer):
    email = EmailField(label="Email address")
    password = CharField(style={'input_type': 'password'})

    # Pass PatientCreateSerializer and include it in fields
    patient = PatientCreateSerializer()

    class Meta:
        model = User
        fields = [
            'patient',
            'first_name',
            'last_name',
            'username',
            'password',
            'email',
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

        # Require user's first name
        if first_name.strip() == '':
            raise serializers.ValidationError("First name is required.")
            return

        #if email.strip() == '':
            #raise serializers.ValidationError("Email is required.")
            #return

        if User.objects.filter(email=email):
            raise serializers.ValidationError('This email address is already in use. '
                                        'Please try a different email address.')
            return email.lower()
        else:
            # Then there is no other users with the new email
            # Do whatever you have to do, return true or update user
            user_obj = User(username=username,
                        email=email,
                        password=password,
                        first_name = first_name,
                        last_name = last_name,
            )
            user_obj.set_password(password)
            user_obj.save()

            # call Patient create and map the data into the Patient table
            # call it after User has been created and saved; One-To-One Relationship
            patient_data = Patient.objects.create(
                user=user_obj,
                mobile=validated_data['patient']['mobile'],
                diagnosis=validated_data['patient']['diagnosis'],
                doctor=validated_data['patient']['doctor'],
                gender=validated_data['patient']['gender'],
                address=validated_data['patient']['address'],
                category=validated_data['patient']['category'],
                referral=validated_data['patient']['referral'],
                care_giver=validated_data['patient']['care_giver'],
                sector=validated_data['patient']['sector']
            )

            return validated_data


class DoctorSerializer(ModelSerializer):
    class Meta:
        model = Doctor
        # fields = [
        #     'entity'
        # ]

class DoctorCreateSerializer(ModelSerializer):
    email = EmailField(label="Email address")
    password = CharField(style={'input_type': 'password'})

    # Pass PatientCreateSerializer and include it in fields
    doctor = DoctorSerializer()

    class Meta:
        model = User
        fields = [
            'doctor',
            'first_name',
            'last_name',
            'username',
            'password',
            'email',
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

        # Require user's first name
        if first_name.strip() == '':
            raise serializers.ValidationError("First name is required.")
            return

        if User.objects.filter(email=email):
            raise serializers.ValidationError('This email address is already in use. '
                                              'Please try a different email address.')
            return email.lower()
        else:
            # Then there is no other users with the new email
            # Do whatever you have to do, return true or update user
            user_obj = User(username=username,
                            email=email,
                            password=password,
                            first_name=first_name,
                            last_name=last_name,
                            is_staff=1
                            )
            user_obj.set_password(password)
            user_obj.save()

            doctor_data = Doctor.objects.create(
                user=user_obj,
                # entity=validated_data['doctor']['entity']
            )

            return validated_data


# New user register serializer
class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    email = EmailField(label="Email", required=False, allow_blank=True)
    username = CharField(label="Username", required=False, allow_blank=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'is_staff',
            'token'
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        email = data.get("email", None)
        username = data.get("username", None)
        password = data["password"]
        user_obj = None

        if not email and not username:
            raise serializers.ValidationError("A username or email address is required.")
            return

        if email:
            user = User.objects.filter(Q(email=email)).distinct()
        elif username:
            user = User.objects.filter(Q(username=username)).distinct()

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise serializers.ValidationError("The username or email is not valid.")
            return

        if user_obj:
            if not user_obj.check_password(password):
                raise serializers.ValidationError("Incorrect credentials!")
                return

            # Generate a JWT token
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user_obj)
            token = jwt_encode_handler(payload)
            data['token'] = token

            # Check id user is patient
            data['is_staff'] = user_obj.is_staff
            return data
        else:
            raise serializers.ValidationError("User not found!")
            return


# User profile serializer
class UserProfileSerializer(ModelSerializer):
    last_name = CharField(label="Last name", required=False, allow_blank=True)
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
        ]

# User serializer with user fname and lname
# Used with patient record serializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name'
        ]


# User GET serializer with user fname and lname and username
class UserGetSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name'
        ]


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'question'
        ]


class QuestionGetSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'question'
        ]


class AnswerListSerializer(ListSerializer):
    def create(self, validated_data):
            additionals = [Answer(**item) for item in validated_data]
            return Answer.objects.bulk_create(additionals)


class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            'answer',
            'text',
            'question',
            'record'
        ]
        list_serializer_class = AnswerListSerializer


class SymptomListSerializer(ListSerializer):
    def create(self, validated_data):
        additionals = [Symptom(**item) for item in validated_data]
        return Symptom.objects.bulk_create(additionals)


class SymptomSerializer(ModelSerializer):
    class Meta:
        model = Symptom
        fields = [
            'symptom',
            'answer',
            'record'
        ]
        list_serializer_class = SymptomListSerializer

class RecordSerializer(ModelSerializer):
    signed = UserGetSerializer(required = False)
    class Meta:
        model = Record
        fields = [
            'id',
            'date',
            'score',
            'created_date',
            'signed'
        ]

class AnswerGetSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            'question',
            'answer',
            'text',
        ]

class SymptomGetSerializer(ModelSerializer):
    class Meta:
        model = Symptom
        fields = [
            'symptom',
            'answer'
        ]
        
######################################################################################
# privileged user serializer classes
######################################################################################
# Patient serializer
class PatientSectorSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'sector',
        ]


# New user register serializer
class PatientActivateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'is_active'
        ]


# User profile serializer
class NotesCreateSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = [
            'id',
            'date',
            'notes',
            'dosage'
        ]


# User profile serializer
class NotesGetSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = [
            'date',
            'notes',
            'dosage'
        ]


# Get Patient Serializer used for data and score
class PatientGetSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
        ]

# Get Patient Serializer used for get all patients
class PatientStatusGetSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'is_active'
            ]

# Serializer to return patient fname ,lname along with the score
class PatientScoreGetSerializer(ModelSerializer):
    # Get user data and include it
    user = UserSerializer(read_only=True)
    class Meta:
        model = Record
        #fields = '__all__'
        fields = [
            'user',
            'date',
            'score',
        ]


class PatientRecordGetSerializer(ModelSerializer):
    # Get answers associated with each record
    class Meta:
        model = Answer
        fields = [
            'question',
            'answer',
            'text',
        ]