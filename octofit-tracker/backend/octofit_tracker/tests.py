from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team, self.team)

class TeamTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')

class ActivityTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)
        self.activity = Activity.objects.create(user=self.user, type='run', duration=30, distance=5.0)

    def test_activity_creation(self):
        self.assertEqual(self.activity.user, self.user)
        self.assertEqual(self.activity.type, 'run')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.distance, 5.0)

class WorkoutTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='A test workout', suggested_by=self.user)

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.description, 'A test workout')
        self.assertEqual(self.workout.suggested_by, self.user)

class LeaderboardTestCase(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)
        self.leaderboard = Leaderboard.objects.create(user=self.user, points=100)

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.user, self.user)
        self.assertEqual(self.leaderboard.points, 100)