from django.contrib import admin
from django.contrib.sessions.models import Session
import csv, datetime
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

from .models import Patient, Doctor, Question, Answer, Record, Symptom, Notes, Entity, Log

admin.site.unregister(User)
@admin.register(User)
class UserAdmin(ImportExportModelAdmin):
	list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')

@admin.register(Patient)
class PatientAdmin(ImportExportModelAdmin):
	list_display = [field.name for field in Patient._meta.get_fields() if field.name != 'doctor']

@admin.register(Log)
class LogAdmin(ImportExportModelAdmin):
	list_display = [field.name for field in Log._meta.get_fields()]

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Doctor._meta.get_fields() if field.name != 'patient']

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Answer._meta.get_fields()]

@admin.register(Record)
class RecordAdmin(ImportExportModelAdmin):
	list_display = ('date', 'user', 'score', 'created_date', 'signed',)

@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Notes._meta.get_fields()]

@admin.register(Symptom)
class SymptomAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Symptom._meta.get_fields()]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ('question',)

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date']

# class PatientAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Patient._meta.get_fields() if field.name != 'doctor']

# class LogAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Log._meta.get_fields()]

# class DoctorAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Doctor._meta.get_fields() if field.name != 'patient']

# class AnswerAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Answer._meta.get_fields()]

# class QuestionAdmin(admin.ModelAdmin):
# 	list_display = ('question',)

# class EntityAdmin(admin.ModelAdmin):
# 	list_display = ('name', 'street', 'city', 'state', 'country',)
	# list_display = [field.name for field in Entity._meta.get_fields()]

# class RecordAdmin(admin.ModelAdmin):
# 	# list_display = [field.name for field in Record._meta.get_fields()]
# 	list_display = ('date', 'user', 'score', 'created_date', 'signed',)

# class NotesAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Notes._meta.get_fields()]

# class SymptomAdmin(admin.ModelAdmin):
# 	list_display = [field.name for field in Symptom._meta.get_fields()]

# class SessionAdmin(admin.ModelAdmin):
#     def _session_data(self, obj):
#         return obj.get_decoded()
#     list_display = ['session_key', '_session_data', 'expire_date']


# admin.site.register(Session, SessionAdmin)
# admin.site.register(Log, LogAdmin)
# # admin.site.register(Patient, PatientAdmin)
# admin.site.register(Doctor, DoctorAdmin)
# admin.site.register(Answer, AnswerAdmin)
# admin.site.register(Question, QuestionAdmin)
# admin.site.register(Entity, EntityAdmin)
# admin.site.register(Record, RecordAdmin)
# admin.site.register(Notes, NotesAdmin)
# admin.site.register(Symptom, SymptomAdmin)