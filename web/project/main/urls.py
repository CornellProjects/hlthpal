from django.conf.urls import url, include
from rest_framework.authtoken import views as authviews
from rest_framework_jwt import views as jwt_views
from . import views

urlpatterns = [
    url(r'^home/', views.index, name='index'),
    url(r'^downloads/android', views.download_android, name='download-android'),
    # Authentication APIs
    url(r'^api/auth', jwt_views.obtain_jwt_token, name="auth"),
    url(r'^api/token-verify', jwt_views.verify_jwt_token, name="token-verify"),
    url(r'^api/token-refresh', jwt_views.refresh_jwt_token, name="token-refresh"),
    # User APIs
    url(r'^api/register', views.UserCreateView.as_view(), name="register"),
    url(r'^api/login', views.UserLoginView.as_view(), name="login"),
    url(r'^api/valid_email', views.UserValidateEmail.as_view(), name="validate_email"),
    url(r'^api/user', views.CurrentUserView.as_view(), name="user"),
    url(r'^api/profile', views.UserProfileView.as_view(), name="profile"),
    url(r'^api/record', views.RecordAPIView.as_view(), name="record"),
    url(r'^api/questions', views.QuestionGetAPIView.as_view(), name="questions"),
    url(r'^api/answer', views.AnswerAPIView.as_view(), name="answer"),
    url(r'^api/symptom', views.SymptomAPIView.as_view(), name="symptom"),
    url(r'^api/edit_symptom/(?P<record>\d+)/(?P<symptom>\d+)$', views.SymptomUpdateView.as_view(), name="edit_symptom"),
    url(r'^api/edit_answer/(?P<record>\d+)/(?P<question>\d+)$', views.AnswerUpdateView.as_view(), name="edit_answer"),
    url(r'^api/edit_record/(?P<pk>\d+)$', views.RecordUpdateView.as_view(), name="edit_record"),
    url(r'^api/edit_question/(?P<pk>\d+)$', views.QuestionUpdateView.as_view(), name="edit_question"),
    # Privileged user APIs
    url(r'^api/entity', views.EntityCreateView.as_view(), name="entity"),
    url(r'^api/doctor', views.DoctorCreateView.as_view(), name="doctor"),
    url(r'^api/all_doctors', views.DoctorGetView.as_view(), name="all_doctors"),
    url(r'^api/patient/history$', views.PatientHistoryView.as_view(), name="patient_history"),
    url(r'^api/patient/activate$', views.PatientActivateView.as_view(), name="patient_activate"),
    url(r'^api/patient/deactivate$', views.PatientDeactivateView.as_view(), name="patient_deactivate"),
    url(r'^api/patients$', views.PatientGetView.as_view(), name="patients"),
    url(r'^api/patients/data$', views.PatientDataGetView.as_view(), name="patient_record"),
    url(r'^api/patients/score$', views.PatientScoreGetView.as_view(), name="patient_score"),
    url(r'^api/notes/create$', views.NotesCreateView.as_view(), name="create_notes"),
    url(r'^api/notes/latest$', views.NotesGetAPIView.as_view(), name="view_notes"),
    url(r'^api/notes/history$', views.NotesHistoryGetView.as_view(), name="view_notes_history"),
    url(r'^api/notes/(?P<pk>\d+)$', views.NotesGetAPIView.as_view(), name="view_user_notes"),
]
