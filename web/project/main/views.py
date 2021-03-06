import os
import datetime
from django.utils.dateparse import parse_datetime
import collections, json
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseForbidden
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from django.utils.encoding import smart_str
from django.core.urlresolvers import reverse_lazy
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
from wsgiref.util import FileWrapper
from rest_framework.decorators import detail_route
from rest_framework import generics
from django.db import IntegrityError

# Custom models
from .models import Record, Answer, Entity, Question, Symptom, Notes, Patient, Log, Doctor

# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserGetSerializer,
    AnswerSerializer,
    AnswerGetSerializer,
    RecordSerializer,
    # DoctorCreateSerializer,
    DoctorSerializer,
    EntityCreateSerializer,
    QuestionGetSerializer,
    SymptomSerializer,
    SymptomGetSerializer,
    QuestionSerializer,
    NotesCreateSerializer,
    NotesGetSerializer,
    PatientActivateSerializer,
    PatientGetSerializer,
    PatientSectorSerializer,
    PatientStatusGetSerializer,
    PatientScoreGetSerializer,
    PatientRecordGetSerializer)

# rest_framework imports
from rest_framework import status
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
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
if os.environ.get('DJANGO_SEND_EMAIL'):
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

# endpoint for '/dashboard'
def dashboard(request):
    #get the template
    template = loader.get_template('dashboard.html')
    return HttpResponse(template.render())

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

    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            if not request.user.is_anonymous:
                Log.objects.create(user=request.user, activity='add_new_patient')
            return self.create(request, *args, **kwargs)
        except:
            # print(serializer.errors)
            # print('Errors')
            if not request.user.is_anonymous:
                Log.objects.create(user=request.user, activity='fail_add_new_patient') # failed sign in or sign out.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


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
            if not request.user.is_anonymous:
                Log.objects.create(user=request.user, activity='success_sign_in')
            return Response(result, status=status.HTTP_200_OK)
        else:
            if not request.user.is_anonymous:
                Log.objects.create(user=request.user, activity='failed_sign_in') # failed sign in or sign out.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    '''API to logout and delete an auth token for TokenAuthentication Method'''
    serializer_class = UserLoginSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    # queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
        except Exception as e:
            print(e)
            return Response({"failure": "Not found."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"success": "Successfully logged out."}, status=status.HTTP_204_OK)

class UserValidateEmail(CreateAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    def post(self, request, *args, **kwargs):
        '''Validates if user can be registered by checking email/username doesn't already exist'''
        data = request.data
        if User.objects.filter(username=data['email']) or User.objects.filter(email=data['email']):
            return Response({'status': False}, status=status.HTTP_200_OK)
        else:
            return Response({'status': True}, status=status.HTTP_200_OK)


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

    def post(self, request, *args, **kwargs):
        '''Validates if user can be registered by checking email/username doesn't already exist'''
        for i in range(len(request.data)):
            request.data[i]['question'] = str(Question.objects.get(question_number=request.data[i]['question']).id) # sql returns long integers so need to cast back
        serializer = AnswerSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def create(self, request):
        if 'created_date' in request.data:
            request.data['created_date'] = datetime.datetime.fromtimestamp(int(request.data['created_date'])/1000).strftime('%Y-%m-%d %H:%M:%S'+'Z')
            try:
                record = Record.objects.get(user=request.user, created_date=request.data['created_date'])
                print("One instance already initiated")
                return Response({"detail": "Instance already initiated"}, status=status.HTTP_400_BAD_REQUEST)
            except Record.MultipleObjectsReturned:
                print("Multiple instances initiated")
                return Response({"detail": "Instance already initiated"}, status=status.HTTP_400_BAD_REQUEST)
            except Record.DoesNotExist:
                print("Creating new record")
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                try:
                    serializer.save(user=self.request.user, created_date=request.data['created_date'])
                except IntegrityError:
                    return Response({"detail": "Instance already initiated"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=self.request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return Record.objects.filter(user=self.request.user)

class RecordUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()
    permission_classes = [IsAuthenticated]
    def update(self, request, pk=None):
        record = get_object_or_404(Record, pk=pk)
        for param in request.data:
            if param == 'score':
                record.score = request.data[param]
                print('updating score', record.signed)
            if param == 'update_user':
                record.signed = request.user if record.signed == None else None
                print('updating user', record.signed)
        record.save()
        return Response({'detail': 'Signed user info updated'}, status=status.HTTP_200_OK)

# class RecordUpdateView(RetrieveUpdateDestroyAPIView):
#     '''API to delete or edit a Record '''
#     queryset = Record.objects.filter()
#     serializer_class = RecordSerializer
#     permission_classes = [IsAuthenticated]

#     def update(self, request)
#     model = Record
#     success_url = reverse_lazy('id')


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
######################################################################################


class PatientHistoryView(APIView):
    '''API to get patient history '''
    serializer_class = PatientActivateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def post(self, request, *args, **kwargs):
        data = request.data

        # Check if request contains username
        username = data.get("username", None)
        result = {}
        if not username:
            error = "username is required"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        else:
            pass
            #print "username found", data['username']

        # Check if username is valid
        if User.objects.filter(username=username).exists():
            user = User.objects.filter(username=username).first()

            if user.is_staff:
                error = "user is not a patient!"
                result['error'] = error
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

            user_serial = PatientActivateSerializer(user)

            query = Record.objects.filter(user=user)
            result = []

            for record in query:
                clean_result = {}
                record_serial = RecordSerializer(record)

                clean_result['record'] = record_serial.data

                answers = Answer.objects.filter(record=record_serial.data['id'])
                symptoms = Symptom.objects.filter(record=record_serial.data['id'])

                ans_result, symp_result = [], []
                for ans in answers:
                    ans_serial = AnswerGetSerializer(ans);
                    ans_result.append(ans_serial.data)

                for symp in symptoms:
                    symp_serial = SymptomGetSerializer(symp);
                    symp_result.append(symp_serial.data)

                clean_result['data'] = ans_result
                clean_result['symp'] = symp_result
                result.append(clean_result)
                # print(result)
            return Response(result, status=status.HTTP_200_OK)

        else:
            error = "username does not exist!"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)


class PatientActivateView(APIView):
    ''' API to activate a patient account '''
    serializer_class = PatientActivateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def post(self, request, *args, **kwargs):
        data = request.data

        # Check if request contains username
        username = data.get("username", None)
        result = {}
        if not username:
            error = "username is required"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        else:
            pass
            #print "username found", data['username']

        # Check if username is valid
        if User.objects.filter(username=username).exists():
            user = User.objects.filter(username=username).first()

            if user.is_staff:
                error = "user is not a patient"
                result['error'] = error
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = True
            user.save()
            user_serial = PatientActivateSerializer(user)
            return Response(user_serial.data, status=status.HTTP_200_OK)
        else:
            error = "username does not exist"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)



class PatientDeactivateView(APIView):
    '''API to deactivate a patient account '''
    serializer_class = PatientActivateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def post(self, request, *args, **kwargs):
        data = request.data

        # Check if request contains username
        username = data.get("username", None)
        result = {}
        if not username:
            error = "username is required"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        else:
            pass
            #print "username found", data['username']

        # Check if username is valid
        if User.objects.filter(username=username).exists():
            user = User.objects.filter(username=username).first()

            if user.is_staff:
                error = "user is not a patient"
                result['error'] = error
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = False
            user.save()
            user_serial = PatientActivateSerializer(user)
            return Response(user_serial.data, status=status.HTTP_200_OK)
        else:
            error = "username does not exist"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)


class EntityCreateView(CreateAPIView):
    '''API to create a new Entity '''
    serializer_class = EntityCreateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Entity.objects.all()


class DoctorCreateView(CreateAPIView):
    '''API to create a new doctor user '''
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Doctor.objects.all()

class DoctorGetView(ListAPIView):
    '''API to get doctor users '''
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Doctor.objects.all()

class PatientGetView(ListAPIView):
    '''API to Get a list of all patients '''
    serializer_class = PatientStatusGetSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)


class PatientDataGetView(ListAPIView):
    '''API to get all patients latest data '''
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def get(self, request, format=None):
        patients = User.objects.filter(is_staff=False, is_active=True, date_joined__gte=datetime.date(2018, 06, 28))
        # patients = User.objects.filter(is_staff=False, is_active=True)
        result = []
        if not request.user.is_anonymous:
            Log.objects.create(user=request.user, activity='view_dashboard')

        for user in patients:
            # query = Record.objects.filter(user=user).order_by('-date').first()
            # Get last submission for each patient
            entry = collections.OrderedDict()
            user_serial = PatientGetSerializer(user)
            entry['user'] = user_serial.data;
            patient = Patient.objects.filter(user=user).first()

            # Get sector data
            if patient is not None:
                sector_serial = PatientSectorSerializer(patient)
                entry['location'] = sector_serial.data
                # print(patient,' sector: ', sector_serial.data)
            else:
                entry['location'] = { 'sector': ''}
                # print(patient, 'no sector')

            # Get latest score
            notes = Notes.objects.filter(patient=user).last()
            if notes is not None:
                notes_serial = NotesGetSerializer(notes)
                entry['notes'] = notes_serial.data
            else:
                entry['notes'] = {}


            query = Record.objects.filter(user=user).last()
            if query is not None:
                rec = RecordSerializer(query)
                entry['record'] = rec.data;
                query = Answer.objects.filter(record=rec.data['id'])
                ans = PatientRecordGetSerializer(query,  many=True);
                entry['data'] = ans.data;
                result.append(entry)
            else:
                entry['record'] = {'date':'1900-05-24T07:27:21.238535Z'}
                entry['data'] = []
                result.append(entry)

        result = sorted(result, key=lambda x: float(parse_datetime(x['record']['date']).strftime('%s')), reverse=True) 
        return Response(result)


class PatientScoreGetView(ListAPIView):
    '''API to get all patients latest score '''
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def get(self, request, format=None):
        patients = User.objects.filter(is_staff=False, is_active=True)
        result = []
        for user in patients:
            # query = Record.objects.filter(user=user).order_by('-date').first()
            # Get last submission for each patient
            entry = collections.OrderedDict()
            user_serial = PatientGetSerializer(user)
            entry['user'] = user_serial.data;

            patient = Patient.objects.filter(user=user).first()
            if patient is not None:
                sector_serial = PatientSectorSerializer(patient)
                entry['location'] = sector_serial.data
            else:
                entry['location'] = { 'sector': ''}

            query = Record.objects.filter(user=user).last()
            if query is not None:
                rec = RecordSerializer(query)
                entry['record'] = rec.data;
                result.append(entry)
        return Response(result)


class NotesCreateView(APIView):
    '''API to add notes for a patient '''
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def post(self, request, format=None):
        if not request.user.is_anonymous:
            Log.objects.create(user=request.user, activity='add_patient_note')
        data = request.data
        result = {}
        # Check who posted
        auth_user = None
        if request and request.user:
            auth_user = request.user
            #print "Auth user: ", str(auth_user)

        # Check if request contains notes username
        notes = data.get("notes", None)
        if not notes:
            error = "notes is required!"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        username = data.get("username", None)
        if not username:
            error = "username is required!"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        # Check if requested user is a patient
        if User.objects.filter(username=username).exists():
            user = User.objects.filter(username=username).first()

            if user.is_staff:
                error = "user is not a patient"
                result['error'] = error
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

            # Dosage is optional
            dosage = data.get("dosage", None)
            if not dosage:
                saved_notes = Notes.objects.create(author=auth_user, patient=user, notes=notes)
            else:
                saved_notes = Notes.objects.create(author=auth_user, patient=user, notes=notes, dosage=dosage)

            notes_serial =  NotesCreateSerializer(saved_notes)
            # print notes_serial.data
            return Response(notes_serial.data, status=status.HTTP_201_CREATED)
        else:
            error = "username does not exist!"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        return Response(result)



class NotesGetAPIView(ListAPIView):
    '''API to get notes for all users'''
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Notes.objects.all()

    def get(self, request, format=None):
        patients = User.objects.filter(is_staff=False, is_active=True)
        result = []
        for patient in patients:
            # query = Record.objects.filter(user=user).order_by('-date').first()
            # Get last submission for each patient
            entry = collections.OrderedDict()
            user_serial = PatientGetSerializer(patient)
            entry['patient'] = user_serial.data;

            notes = Notes.objects.filter(patient=patient).last()
            if notes is not None:
                notes_serial = NotesGetSerializer(notes)
                entry['notes'] = notes_serial.data
            else:
                entry['notes'] = {}

            result.append(entry)
        return Response(result)


class NotesHistoryGetView(APIView):
    '''API to get patient history '''
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.filter(is_staff=False)

    def post(self, request, *args, **kwargs):
        data = request.data

        if not request.user.is_anonymous:
            Log.objects.create(user=request.user, activity='view_patient_details')
        # Check if request contains username
        username = data.get("username", None)
        result = {}
        if not username:
            error = "username is required"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
        else:
            pass
            #print "username found", data['username']

        # Check if username is valid
        if User.objects.filter(username=username).exists():
            user = User.objects.filter(username=username).first()

            if user.is_staff:
                error = "user is not a patient!"
                result['error'] = error
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

            user_serial = UserGetSerializer(user)

            query = Notes.objects.filter(patient=user)
            result = []

            for record in query:
                notes_serial = NotesGetSerializer(record)
                result.append(notes_serial.data)
            return Response(result, status=status.HTTP_200_OK)

        else:
            error = "username does not exist!"
            result['error'] = error
            return Response(result, status=status.HTTP_400_BAD_REQUEST)