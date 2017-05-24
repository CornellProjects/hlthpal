from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model


# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
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
)

# Import permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

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
        if serializer.is_valid(raise_exception=True ):
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