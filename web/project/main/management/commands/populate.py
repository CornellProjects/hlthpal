from django.core.management.base import BaseCommand
from main.models import Question, Answer

# creating django-admin command test
class Command(BaseCommand):
    help = 'Populate questions'

    def handle(self, *args, **options):
        questions = [
            'What have been your main problems or concerns over the past week?',
            'Pain',
            'Shortness of breath',
            'Weakness or lack of energy',
            'Nausea (feeling like you are going to be sick',
            'Vomiting (being sick)',
            'Poor appetite',
            'Constipation',
            'Sore or dry mouth',
            'Drowsiness',
            'Poor mobility',
            'Have you been feeling anxious or worried about your illness or treatment?',
            'Have any of your family or friends been anxious or worried about you?',
            'Have you been feeling depressed?',
            'Have you felt at peace',
            'Have you been able to share how you are feeling with your family or friends'
            ' as much as you wanted?',
            'Have you had as much information as you wanted?',
            'Have any practical problems resulting from your illness been addressed? '
            '(such as financial or personal)',
            'How did you complete this questionnaire?'
        ]

        for question in questions:
            q = Question.objects.create(question=question)

        self.stdout.write(self.style.SUCCESS('Questions have been populated'))