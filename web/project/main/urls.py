from django.conf.urls import url, include
from rest_framework.authtoken import views as authviews
from rest_framework_jwt import views as jwt_views
#from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    url(r'^home/', views.index, name='index'),
    #url(r'^api-token-auth/', authviews.obtain_auth_token),
    url(r'^api-token-auth/', jwt_views.obtain_jwt_token),
    url(r'^api-token-verify/', jwt_views.verify_jwt_token),
    url(r'^api-token-refresh/', jwt_views.refresh_jwt_token),

]
