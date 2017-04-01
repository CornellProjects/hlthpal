from django.shortcuts import render
from django.http import HttpResponse


# endpoint for /index
def index(request):
    return HttpResponse("Hello, world. You're at the index page.")


# endpoint for /login
def login(request):
    return HttpResponse("Hello, world. This is the login endpoint.")


# endpoint for /logout
def logout(request):
    return HttpResponse("Hello, world. This is the logout endpoint.")


# endpoint for /update
def update(request):
    return HttpResponse("Hello, world. This is the update api.")
