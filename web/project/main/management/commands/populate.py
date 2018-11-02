from django.core.management.base import BaseCommand
from main.models import Question

# creating django-admin command test
class Command(BaseCommand):
    help = 'Populate questions'

    def handle(self, *args, **options):
        questions = {
            '1': 'Pain',
            '2': 'Shortness of Breath',
            '3': 'Fatigue',
            '4': 'Nausea',
            '5': 'Vomiting',
            '6': 'Poor Appetite',
            '7': 'Constipation',
            '8': 'Have you been feeling worried about your illness in the past 3 days?',
            '9': 'Over the past 3 days, have you been able to share how you are feeling with your family or friends?',
            '10': 'Over the past 3 days have you felt that life was worthwhile?',
            '11': 'Over the past 3 days, have you felt at peace?',
            '12': 'Have you had enough help and advice for your family to plan for the future?'
        }
        if len(Question.objects.all()) == 0: # Questions ahve not been populated yet
            for question_number in questions:
                q = Question.objects.create(question_number=question_number, question=questions[question_number])

            self.stdout.write(self.style.SUCCESS('Questions were successfully populated'))
        else:
            self.stdout.write(self.style.SUCCESS('Questions are already present in the database'))