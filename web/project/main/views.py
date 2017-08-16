from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model
from django.views.generic import UpdateView
from rest_framework.authentication import TokenAuthentication

from django.core.urlresolvers import reverse_lazy

# Custom models
from .models import Questionnaire, Answer, Entity, Question

# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    AnswerSerializer,
    QuestionnaireSerializer,
    DoctorCreateSerializer,
    EntityCreateSerializer,
    QuestionGetSerializer)

# rest_framework imports
from rest_framework import status
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404)

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


class EntityCreateView(CreateAPIView):
    '''API to create a new Entity '''
    serializer_class = EntityCreateSerializer
    permission_classes = [AllowAny]
    queryset = Entity.objects.all()


class DoctorCreateView(CreateAPIView):
    '''API to create a new doctor user '''
    serializer_class = DoctorCreateSerializer
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


class AnswerAPIView(ListCreateAPIView):
    '''API to create one or multiple Answer instances '''
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            if isinstance(data, list):
                kwargs["many"] = True
        return super(AnswerAPIView, self).get_serializer(*args, **kwargs)


class QuestionnaireAPIView(ListCreateAPIView):
    '''API to GET or create a new questionnaire '''
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Questionnaire.objects.filter(user=self.request.user)


class QuestionnaireUpdateView(RetrieveUpdateDestroyAPIView):
    '''API to delete or edit a questionnaire '''
    queryset = Questionnaire.objects.filter()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated]
    model = Questionnaire
    success_url = reverse_lazy('id')


# Custom mixin for Generic views in Django Rest Framework API Guide
class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]: # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)  # Lookup the object


class AnswerUpdateView(RetrieveUpdateDestroyAPIView):
    ''' API to delete or edit an answer based on the question associated with it '''
    queryset = Answer.objects.filter()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    model = Answer
    success_url = reverse_lazy('id')


class QuestionGetAPIView(ListAPIView):
    '''API to get questions in the database '''
    serializer_class = QuestionGetSerializer
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()


class CurrentUserView(APIView):
    '''API to get current user's information '''
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserCreateSerializer(self.request.user)
        return Response(serializer.data)


# Symptoms GET API
# class SymptomsGetAPIView(ListAPIView):
#     """
#     Get symptoms for a user.
#     """
#     queryset = Symptoms.objects.all()
#     serializer_class = SymptomsGetSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, format=None):
#         symptoms = Symptoms.objects.filter(owner=self.request.user)
#         serializer = SymptomsGetSerializer(symptoms, many=True,)
#         return Response(serializer.data)