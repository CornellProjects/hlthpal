from django.conf.urls import url, include
from rest_framework.authtoken import views as authviews
from . import views

urlpatterns = [
    url(r'^home/', views.index, name='index'),
    url(r'^api-token-auth/', authviews.obtain_auth_token),
]
