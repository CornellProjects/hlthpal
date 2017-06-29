from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication

# Custom models
from .models import Symptoms, Patient, Record

# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    SymptomsCreateSerializer,
    SymptomsGetSerializer,
    PatientCreateSerializer

)

# rest_framework imports
from rest_framework import status
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    ListCreateAPIView
)

# Import permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

# Custom permissions
from .permissions import IsOwner

######################################################################################
# Method based views
# endpoint for '/home'
def index(request):
    #get the template 
    template = loader.get_template('index.html')
    return HttpResponse(template.render())


######################################################################################
# Class based views

User = get_user_model()

class UserCreateView(CreateAPIView):
    '''API to create a new user '''
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class UserLoginView(APIView):
    '''API to login and obtain an auth token'''
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            result = serializer.data
            # Only return token
            if result.has_key('username'):
                result.pop('username')
            if result.has_key('email'):
                result.pop('email')
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    '''API to GET user profile information.'''
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, format=None):
        user_obj = self.request.user
        query = User.objects.filter(username=user_obj)
        serializer = UserProfileSerializer(user_obj)
        return Response(serializer.data)


# Symptoms Create API
class SymptomsCreateAPIView(ListCreateAPIView):
    """
    Create a new symptoms record.
    """
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class PatientCreateAPIView(ListCreateAPIView):
    serializer_class = PatientCreateSerializer
    permission_classes = [IsAuthenticated]
    queryset = Patient.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# Symptoms GET API
class SymptomsGetAPIView(ListAPIView):
    """
    Get symptoms for a user.
    """
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsGetSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        symptoms = Symptoms.objects.filter(owner=self.request.user)
        serializer = SymptomsGetSerializer(symptoms, many=True,)
        return Response(serializer.data)


class CurrentUserView(APIView):
    permission_classes = [IsOwner]

    def get(self, request):
        serializer = UserCreateSerializer(self.request.user)
        return Response(serializer.data)


class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserCreateSerializer

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user and pk == 'me':
            return Response(UserCreateSerializer(request.user).data)
        return super(UserView, self).retrieve(request, pk)


