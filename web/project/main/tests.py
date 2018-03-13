# Create your tests here.
from django.test import TestCase
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.firefox.webdriver import WebDriver
from main.serializers import *
from main.models import *
import os, django, requests, json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()


class ModelTestCase(TestCase):

    # instantiate models in database
    def setUp(self):
        patient1 = User.objects.create(first_name="Rumbai", last_name="Katenge", email="kigali@gmail.com",
                                       password="#$5323adaad", username="olukats")
        doctor1 = User.objects.create(first_name="Johnson", last_name="Malaika", email="jssm@gmail.com",
                                      password="#$5323adaad", username="jmaalai")
        entity1 = Entity.objects.create(name="Kigali", street="Rue 21", city="Kigali", state="Kigali", country="Rwanda")
        question1 = Question.objects.create(question="How are you feeling today?")
        record1 = Record.objects.create(user=patient1, score=20)

        Patient.objects.create(user=patient1, doctor="Malaika", care_giver="Sarah", diagnosis="Malaria",
                               gender="M", mobile="3456724158", street="14th Ave", sector="Route 1",
                               city="Kigali", state="Kigali", country="Rwanda")
        Doctor.objects.create(user=doctor1, entity=entity1)
        Symptom.objects.create(answer=10, record=record1, symptom="Headache")
        Answer.objects.create(record=record1, question=question1, answer=10, text="Some text")
        Notes.objects.create(author=doctor1, patient=patient1, notes="I have checked on the patient now", dosage=10)

    def test_create_patient(self):
        patient1 = Patient.objects.get(user__username="olukats")
        self.assertEqual(patient1.user.username, "olukats")

    def test_create_doctor(self):
        doctor1 = Doctor.objects.get(user__username="jmaalai")
        self.assertEqual(doctor1.user.username, "jmaalai")

    def test_create_question(self):
        self.assertEqual(Question.objects.count() > 0, True)

    def test_create_record(self):
        self.assertEqual(Record.objects.count() > 0, True)

    def test_create_symptom(self):
        self.assertEqual(Symptom.objects.count() > 0, True)

    def test_create_answer(self):
        self.assertEqual(Answer.objects.count() > 0, True)

    def test_create_note(self):
        self.assertEqual(Notes.objects.count() > 0, True)

    def test_create_entity(self):
        entity1 = Entity.objects.get(name="Kigali")
        self.assertEqual(entity1.name, "Kigali")


class ApiTestCases(StaticLiveServerTestCase):

    def test_create_patient(self):
        # create and add a patient to database
        print("Running test_create_patient\n")
        params = {"patient": {"doctor": "Malaika",
                              "care_giver": "Sarah",
                              "diagnosis": "Malaria",
                              "gender": "Male",
                              "mobile": "3456724158",
                              "street": "14th Ave",
                              "sector": "Route 1",
                              "city": "Kigali",
                              "state": "Kigali",
                              "country": "Rwanda"
                            },
                  "first_name": "Rumbai",
                  "last_name": "Katenge",
                  "email": "kigali@gmail.com",
                  "password": "#$5323adaad",
                  "username": "olukats"
                  }
        r = requests.post("%s%s" % (self.live_server_url, "/api/register"), data=json.dumps(params),
                          headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)

    def test_get_user_patient(self):
        # retrieve patient from database, test depends on first successfully creating patient
        print("Running test_get_patient\n")
        self.test_create_patient()
        r = requests.get("%s%s" % (self.live_server_url, "/api/user"), auth=("olukats", "#$5323adaad"),
                         headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 200)

    def test_update_user_patient(self):
        # update patient's email and doctor Name from Malaika to Johnson
        print("Running test_update_patient\n")
        self.test_create_patient()
        params = {"patient": {"doctor": "Johnson",
                              "care_giver": "Sarah",
                              "diagnosis": "Malaria",
                              "gender": "Male",
                              "mobile": "3456724158",
                              "street": "14th Ave",
                              "sector": "Route 1",
                              "city": "Kigali",
                              "state": "Kigali",
                              "country": "Rwanda"
                            },
                  "first_name": "Rumbai",
                  "last_name": "Katenge",
                  "email": "kigali2018@gmail.com",
                  "password": "#$5323adaad",
                  "username": "olukats"
                  }
        r = requests.patch("%s%s" % (self.live_server_url, "/api/user"), data=json.dumps(params),
                           auth=("olukats", "#$5323adaad"), headers={"Content-Type": "application/json"})
        print(r.json())
        return self.assertTrue(int(r.status_code) == 200)

    def test_delete_user_patient(self):
        print("Running test_delete_user")
        self.test_create_patient()

        r = requests.delete("%s%s" % (self.live_server_url, "/api/user/"),
                            auth=("olukats", "#$5323adaad"), headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 204)

    def test_create_entity(self):
        print("Running test_create_entity")
        params = {"name":"Hospital","street":"street","city":"city","state":"state","country":"country"}
        # "Authorization: JWT __YOUR_TOKEN__"
        r = requests.post("%s%s" % (self.live_server_url, "/api/entity"), data=json.dumps(params), auth=(),
                          headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)

    def test_create_doctor(self):
        # add a doctor to the database
        print("Running test_create_doctor")
        params = {"first_name":"John", "last_name":"John", "email":"patrick@gmail.com", "username":"patrick",
                  "password":"testPassword", "doctor": {"entity": 1} }
        r = requests.post("%s%s" % (self.live_server_url, "/api/doctor"), data=json.dumps(params), auth=(),
                          headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)

    def test_create_record(self):
        print("Running test_create_record")
        params = {"score":15}
        r = requests.post("%s%s" % (self.live_server_url, "/api/record"), data=json.dumps(params), auth=(),
                          headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)

    def test_update_record(self):
        print("Running test_update_record")
        self.test_create_record()
        params = {"score":10}
        r = requests.put("%s%s" % (self.live_server_url, "/api/edit_record/1"), data=json.dumps(params), auth=(),
                          headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 200 and r.json()['score']==10)

    def test_create_answer(self):
        print("Running test_create_answer")
        params = {"answer":1,"text":"","question":2,"record":2}
        r = requests.put("%s%s" % (self.live_server_url, "/api/answer"), data=json.dumps(params), auth=(),
                         headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)

    def test_update_answer(self):
        print("Running test_edit_answer\n")
        self.test_create_answer()
        params = {"answer":1,"text":""}
        r = requests.put("%s%s" % (self.live_server_url, "/api/answer/1"), data=json.dumps(params), auth=(),
                         headers={"Content-Type": "application/json"})
        return self.assertTrue(int(r.status_code) == 201)



