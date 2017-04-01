from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

# endpoint for /index
def index(request):
    #get the template 
    template = loader.get_template('index.html')

    #render the template in HttpResponse
    return HttpResponse(template.render())	


# endpoint for /login
def login(request):
    return HttpResponse("Hello, world. This is the login endpoint.")


# endpoint for /logout
def logout(request):
    return HttpResponse("Hello, world. This is the logout endpoint.")


# endpoint for /update
def update(request):
    return HttpResponse("Hello, world. This is the update api.")
