from rest_framework import serializers, exceptions
from rest_framework import permissions
from rest_framework.serializers import(ModelSerializer, EmailField, CharField)
from rest_framework_jwt.settings import api_settings
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.db.models import Q

# Custom models
from .models import Symptoms

######################################################################################
# Serializers for user object

User = get_user_model()

# New user register serializer
class UserCreateSerializer(ModelSerializer):
    email = EmailField(label="Email address")
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'password',
            'email',
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print validated_data
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

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
                        last_name = last_name)
            user_obj.set_password(password)
            user_obj.save()
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
            'token'
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        email = data.get("email", None)
        username = data.get("username", None)
        password = data["password"]
        user_obj = None

        if not email and not username:
            serializers.ValidationError("A username or email address is required.")

        if email:
            user = User.objects.filter(Q(email=email)).distinct()
        elif username:
            user = User.objects.filter(Q(username=username)).distinct()

        #print "Users: ", user
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


# Create Symptoms serializer
class SymptomsCreateSerializer(ModelSerializer):
    class Meta:
        model = Symptoms
        fields =[
            'id',
            's1',
            's2',
            's3'
        ]


# GET Symptoms serializer
class SymptomsGetSerializer(ModelSerializer):
    class Meta:
        model = Symptoms
        fields =[
            'id',
            'date',
            's1',
            's2',
            's3'
        ]




