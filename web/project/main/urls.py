from django.conf.urls import url, include
from rest_framework.authtoken import views as authviews
from rest_framework_jwt import views as jwt_views
from . import views

urlpatterns = [
    url(r'^home/', views.index, name='index'),
    # Authentication APIs
    #url(r'^api-token-auth/', authviews.obtain_auth_token),
    url(r'^api/auth', jwt_views.obtain_jwt_token, name="auth"),
    url(r'^api/token-verify', jwt_views.verify_jwt_token, name="token-verify"),
    url(r'^api/token-refresh', jwt_views.refresh_jwt_token, name="token-refresh"),
    # User APIs
    url(r'^api/register', views.UserCreateView.as_view(), name="register"),
    url(r'^api/entity', views.EntityCreateView.as_view(), name="entity"),
    url(r'^api/doctor', views.DoctorCreateView.as_view(), name="doctor"),
    url(r'^api/login', views.UserLoginView.as_view(), name="login"),
    url(r'^api/user', views.CurrentUserView.as_view(), name="user"),
    url(r'^api/profile', views.UserProfileView.as_view(), name="profile"),
    url(r'^api/record', views.QuestionnaireAPIView.as_view(), name="record"),
    url(r'^api/questions', views.QuestionGetAPIView.as_view(), name="questions"),
    url(r'^api/answer', views.AnswerAPIView.as_view(), name="answer"),
    url(r'^api/edit_answer/(?P<pk>\d+)$', views.AnswerUpdateView.as_view(), name="edit_answer"),
    url(r'^api/edit_record/(?P<pk>\d+)$', views.QuestionnaireUpdateView.as_view(), name="edit_record"),
]
