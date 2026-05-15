from djongo import models
from django.contrib.auth.models import AbstractUser

class Team(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    id = models.ObjectIdField(primary_key=True)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)

class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    distance = models.FloatField()

class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.IntegerField()
