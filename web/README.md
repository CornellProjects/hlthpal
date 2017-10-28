## Requirements 
Must have Python 2.7 installed. Create a virtual env for this project if you use python 3 for other projects.

Must have Django framework installed.
Visit the offical Django website for details: [Install Django](https://www.djangoproject.com/start/)

You should be able to install all dependencies with pip. Install pip and run the following command from ``` hlthpal/web/ ```
directory. 
``` pip install -r requirements.txt" in your shell.``` 

## Project setup
Clone the repo using the git clone command. Run Django application using the following commands.
```  cd web/project ```
``` python manage.py runserver ```

By default django uses a sql-lite database that comes bundeled with the Django framework.
If you plan to connect your application to a Relational database liek MySql or PostGres you must configure your database first.

Read more about different database options [here](https://docs.djangoproject.com/en/1.10/topics/install/#database-installation).

<hr/>


## REST APIs 
Here is a brief description of the supported APIs. You can test the APIs using your browser or using commandline if you have curl installed.

---
#### POST 'api/auth'
* Get authentication token for a given user with username.
* URL: http://127.0.0.1:8000/api/auth
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"username":"John","password":"testPassword"}' http://127.0.0.1:8000/api/auth/ ```

---
#### POST 'api/login'
* Get authentication token for a given user with email or username. Can be used instead of 'api/auth'.
* URL: http://127.0.0.1:8000/api/login
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"email":"john@gmail.com","password":"testPassword"}' http://127.0.0.1:8000/api/login/ ```
``` curl -i -X POST -H "Content-Type: application/json" -d '{"username":"John_21","password":"testPassword"}' http://127.0.0.1:8000/api/login/ ```

---
#### GET 'api/user'
* Get information on authenticated user.
* URL: http://127.0.0.1:8000/api/user
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/user ```

---
#### POST 'api/register'
* API for patient Registration.
* URL: http://127.0.0.1:8000/api/register
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"first_name":"John", "last_name":"Misod","email":"mike@gmail.com","username":"mike@gmail.com","password":"testPassword", "patient" : { "diagnosis":"diagnosis","care_giver":"Mary Smith", "doctor":"John Smith", "gender":"male", "mobile":"555-5555", "street":"street", "city":"city", "state":"state", "country":"country"} }' http://127.0.0.1:8000/api/register ```

---
#### POST 'api/entity'
* API for Hospital/organization Registration. Required to register a doctor. For priviliged users only.
* URL: http://127.0.0.1:8000/api/entity 
* ``` curl -i -X POST -H "Authorization: JWT __YOUR_TOKEN__" -H "Content-Type: application/json" -d '{"name":"Hospital","street":"street","city":"city","state":"state","country":"country"}' http://127.0.0.1:8000/api/entity ```

---
#### POST 'api/doctor' 
* API for Doctor Registration. Every doctor must be associated with an entity - hospital/organization. For priviliged users only.
* URL: http://127.0.0.1:8000/api/doctor 
* ``` curl -i -X POST -H "Authorization: JWT __YOUR_TOKEN__" -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"John","email":"patrick@gmail.com","username":"patrick", "password":"testPassword", "doctor": {"entity": 1} }' http://127.0.0.1:8000/api/doctor  ```


---
####  POST 'api/token-refresh' 
* Refresh authentication token for particular user.
* URL: http://127.0.0.1:8000/api/token-refresh 
* ``` curl -i -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/token-refresh ```

---
####  POST 'api/record' 
* Create a new record with the score calculated from the front-end.
* URL: http://127.0.0.1:8000/api/record 
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"score":15}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/record ```

---
####  PUT 'api/edit_record' 
* Delete or update score of a particular record based on its pk (primary key).
* URL: http://127.0.0.1:8000/api/edit_record/(?P<pk>\d+)$ 
* ``` curl -i -X PUT -H "Content-Type: application/json" -d '{"score":15}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/edit_record/1  ```

---
####  POST 'api/answer'
* Create one or multiple instances of model Answer. 
* URL: http://127.0.0.1:8000/api/answer
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"answer":1,"text":"","question":2,"record":2}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/answer ```

---
####  PUT 'api/edit_answer' 
* Update one instance of model Answer. 
* URL: http://127.0.0.1:8000/api/edit_answer/(?P<record>\d+)/(?P<question>\d+)$ 
* ``` curl -i -X PUT -H "Content-Type: application/json" -d '{"answer":1,"text":""}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/edit_answer/2/2 ```

---
####  POST 'api/symptom' 
* Create one or multiple instances of model Symptom.
* URL: http://127.0.0.1:8000/api/symptom 
* ``` curl -i -X POST -H "Content-Type: application/json" -d '{"symptom":"pain","answer":1,"record":2}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/symptom ```

---
####  POST 'api/edit_symptom' 
* Update one instance of model Symptom.
* URL: http://127.0.0.1:8000/api/edit_symptom/(?P<record>\d+)/(?P<symptom>\d+)$ 
* ``` curl -i -X PUT -H "Content-Type: application/json" -d '{"symptom":"pain","answer":5}' -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/edit_symptom/2/pain ```

---
####  GET 'api/questions' 
* Get questions from the database.
* URL: http://127.0.0.1:8000/api/questions
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/questions ```

---
####  GET 'api/edit_question' 
* Edit a particular question from the backend based on its pk.
*  URL: http://127.0.0.1:8000/api/edit_question/(?P<pk>\d+)$ 
* ```curl -i -X PUT -H "Authorization: JWT __YOUR_TOKEN__"  http://127.0.0.1:8000/api/edit_question/2 ```


<hr/>

### Patients API
---
####  GET 'api/patients'
* Get all patient names. For privileged users only.
* URL: http://127.0.0.1:8000/api/patients
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/patients ```

---
####  GET 'api/patients/score'
* Get list of all patients and their latest score. For privileged users only.
* URL: http://127.0.0.1:8000/api/patients/score
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/patients/score ```

---
####  GET 'api/patients/data'
* Get list of all patients with their latest score and answer data.  For privileged users only.
* URL: http://127.0.0.1:8000/api/patients/data
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/patients/data```


### Notes API
---
####   GET 'api/notes'  
* Get all patient notes. For privileged users only. 
* URL: http://127.0.0.1:8000/api/notes 
* ``` curl -i -X GET -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/notes ```


---
####  GET 'api/notes/create'  
* Create a new note. For privileged users only. 
* URL: http://127.0.0.1:8000/api/notes/create </p>
* ``` curl -i -X POST  -H "Content-Type: application/json" -d '{"text": "Some random notes" , "patient" : "Mike Bloomberg"}' -H "Authorization: JWT  __YOUR_TOKEN__" http://127.0.0.1:8000/api/notes/create ```

---
### Project URLs 

####  '/home' 
* Project homepage.
* URL: http://127.0.0.1:8000/home 


####  '/password-reset' 
* Password reset link.
* URL: http://127.0.0.1:8000/password-reset/ 
