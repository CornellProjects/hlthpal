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
    url(r'^api/login', views.UserLoginView.as_view(), name="login"),
    url(r'^api/profile', views.UserProfileView.as_view(), name="profile"),
    url(r'^api/symptoms/post', views.SymptomsCreateAPIView.as_view(), name="symptoms/post"),
    url(r'^api/patient/post', views.PatientCreateAPIView.as_view(), name="patient/post"),
    url(r'^api/symptoms/get', views.SymptomsGetAPIView.as_view(), name="symptoms/get"),
    url(r'^api/patient/get', views.PatientGetAPIView.as_view(), name="patient/get"),
]
