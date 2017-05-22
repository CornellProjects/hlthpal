from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

# endpoint for /index
def index(request):
    #get the template 
    template = loader.get_template('index.html')

    #render the template in HttpResponse
    return HttpResponse(template.render())	
