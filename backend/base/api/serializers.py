# from rest framework import model Serializer
from rest_framework.serializers import ModelSerializer
# import the model we are gonna serializing
from base.models import Note


class NoteSerializer(ModelSerializer):
    # using meta class
    # only need model and fields
    class Meta:
        model = Note
        fields = "__all__"
