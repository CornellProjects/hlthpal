import os
import datetime
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model
from django.views.generic import UpdateView
from rest_framework.authentication import TokenAuthentication
from django.utils.encoding import smart_str
from django.core.urlresolvers import reverse_lazy
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
from wsgiref.util import FileWrapper

# Custom models
from .models import Record, Answer, Entity, Question, Symptom, Notes

# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    AnswerSerializer,
    RecordSerializer,
    DoctorCreateSerializer,
    EntityCreateSerializer,
    QuestionGetSerializer,
    SymptomSerializer,
    QuestionSerializer,
    NotesGetSerializer,
    PatientGetSerializer)

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

from .permissions import IsOwner
from .emails import send_user_registration_emails

User = get_user_model()

#####################################################################################

# Set up trigger for registration email
post_save.connect(send_user_registration_emails, sender=User)

######################################################################################
# Build paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = BASE_DIR + '/downloads/'
RELEASE_APK =  'app-release.apk'

######################################################################################
# Method based views
# endpoint for '/home'
def index(request):
    #get the template 
    template = loader.get_template('index.html')
    data = {'images' :  settings.MEDIA_URL}
    return HttpResponse(template.render(data))


# Method based views
# endpoint for '/home'
def download_android(request):
    file_name = DOWNLOADS_DIR + RELEASE_APK;
    #file_size = os.stat(file).st_size
    file_size = os.path.getsize(file_name)
    wrapper = FileWrapper(file(file_name))
    response = HttpResponse(wrapper, content_type='application/vnd.android.package-archive')
    response['Content-Disposition'] = 'attachment; filename=%s' % smart_str(RELEASE_APK)
    response['Content-Length'] = file_size
    return response

######################################################################################
# Class based user views

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


class SymptomAPIView(ListCreateAPIView):
    '''API to create one or multiple Symptom instances '''
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]
            if isinstance(data, list):
                kwargs["many"] = True
        return super(SymptomAPIView, self).get_serializer(*args, **kwargs)


class RecordAPIView(ListCreateAPIView):
    '''API to GET or create a new Record '''
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Record.objects.filter(user=self.request.user)


class RecordUpdateView(RetrieveUpdateDestroyAPIView):
    '''API to delete or edit a Record '''
    queryset = Record.objects.filter()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]
    model = Record
    success_url = reverse_lazy('id')


class QuestionUpdateView(RetrieveUpdateDestroyAPIView):
    '''API to delete or edit a question '''
    queryset = Question.objects.filter()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    model = Question
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


class AnswerUpdateView(RetrieveUpdateDestroyAPIView, MultipleFieldLookupMixin):
    ''' API to delete or edit an answer based on the question associated with it '''
    queryset = Answer.objects.filter()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    model = Answer
    success_url = reverse_lazy('record', 'question')
    lookup_field = 'record'
    lookup_field = 'question'


class SymptomUpdateView(RetrieveUpdateDestroyAPIView, MultipleFieldLookupMixin):
    ''' API to delete or edit a symptom '''
    queryset = Symptom.objects.filter()
    serializer_class = SymptomSerializer
    permission_classes = [IsAuthenticated]
    model = Symptom
    success_url = reverse_lazy('record', 'symptom')
    lookup_field = 'record'
    lookup_field = 'symptom'


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


######################################################################################
# Class based privileged user views

class EntityCreateView(CreateAPIView):
    '''API to create a new Entity '''
    serializer_class = EntityCreateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Entity.objects.all()


class DoctorCreateView(CreateAPIView):
    '''API to create a new doctor user '''
    serializer_class = DoctorCreateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()

class PatientGetView(ListAPIView):
    '''API to Get a list of all patients '''
    serializer_class = PatientGetSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)


class NotesCreateView(CreateAPIView):
    '''API to add notes for a patient '''
    serializer_class = NotesGetSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()


class NotesGetAPIView(ListAPIView):
    '''API to get notes for all users'''
    serializer_class = NotesGetSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Notes.objects.all()

    def get(self, request, format=None):
        notes = Notes.objects.all()
        serializer = NotesGetSerializer(notes, many=True)
        return Response(serializer.data)
