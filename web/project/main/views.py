from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

# rest_framework imports

# endpoint for '/'
def index(request):
    #get the template 
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

