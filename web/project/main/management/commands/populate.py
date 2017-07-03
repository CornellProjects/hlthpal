from django.core.management.base import BaseCommand

# creating django-admin command test
class Command(BaseCommand):
    help = 'HELLO!'

    def handle(self, *args, **options):
        self.stdout.write("Hello")