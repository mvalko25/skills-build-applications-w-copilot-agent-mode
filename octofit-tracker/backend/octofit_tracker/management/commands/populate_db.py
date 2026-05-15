from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, Leaderboard

from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        marvel, _ = Team.objects.get_or_create(name='Marvel')
        dc, _ = Team.objects.get_or_create(name='DC')

        tony, _ = User.objects.get_or_create(
            username='ironman',
            defaults={
                'email': 'tony@marvel.com',
                'first_name': 'Tony',
                'last_name': 'Stark',
                'team': marvel,
                'password': 'password',
            },
        )
        steve, _ = User.objects.get_or_create(
            username='cap',
            defaults={
                'email': 'steve@marvel.com',
                'first_name': 'Steve',
                'last_name': 'Rogers',
                'team': marvel,
                'password': 'password',
            },
        )
        bruce, _ = User.objects.get_or_create(
            username='hulk',
            defaults={
                'email': 'bruce@marvel.com',
                'first_name': 'Bruce',
                'last_name': 'Banner',
                'team': marvel,
                'password': 'password',
            },
        )
        clark, _ = User.objects.get_or_create(
            username='superman',
            defaults={
                'email': 'clark@dc.com',
                'first_name': 'Clark',
                'last_name': 'Kent',
                'team': dc,
                'password': 'password',
            },
        )
        diana, _ = User.objects.get_or_create(
            username='wonderwoman',
            defaults={
                'email': 'diana@dc.com',
                'first_name': 'Diana',
                'last_name': 'Prince',
                'team': dc,
                'password': 'password',
            },
        )

        Activity.objects.get_or_create(user=tony, type='run', duration=30, distance=5.0)
        Activity.objects.get_or_create(user=steve, type='cycle', duration=60, distance=20.0)
        Activity.objects.get_or_create(user=bruce, type='swim', duration=45, distance=2.0)
        Activity.objects.get_or_create(user=clark, type='run', duration=50, distance=10.0)
        Activity.objects.get_or_create(user=diana, type='cycle', duration=70, distance=25.0)

        Workout.objects.get_or_create(name='Morning Cardio', defaults={'description': 'A quick morning run', 'suggested_by': tony})
        Workout.objects.get_or_create(name='Hero Strength', defaults={'description': 'Strength training for heroes', 'suggested_by': clark})

        Leaderboard.objects.get_or_create(user=tony, defaults={'points': 100})
        Leaderboard.objects.get_or_create(user=steve, defaults={'points': 90})
        Leaderboard.objects.get_or_create(user=bruce, defaults={'points': 80})
        Leaderboard.objects.get_or_create(user=clark, defaults={'points': 110})
        Leaderboard.objects.get_or_create(user=diana, defaults={'points': 95})

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

# Models for reference (should be in octofit_tracker/models.py):
# class Team(models.Model):
#     name = models.CharField(max_length=100)
#
# class Activity(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     type = models.CharField(max_length=50)
#     duration = models.IntegerField()
#     distance = models.FloatField()
#
# class Workout(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     suggested_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#
# class Leaderboard(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     points = models.IntegerField()
