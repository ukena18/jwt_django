from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# Note model for database
class Note(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, null=True)
    body = models.TextField(max_length=200)