from django.contrib import admin
from .models import Note
# Register your models here.


# add note to admin page
admin.site.register(Note)