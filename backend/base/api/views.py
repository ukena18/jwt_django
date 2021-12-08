# Json response returning
from rest_framework.response import Response

# api view for func and permission check
from rest_framework.decorators import api_view,permission_classes
# check if authenticated
# 'AUTH_HEADER_TYPES': ('Bearer',), we are using that in the jwt
from rest_framework.permissions import IsAuthenticated

#we got those two from docs for token serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import NoteSerializer
from base.models import Note

# to add token info
# e are adding our user name
#we got those two from docs for token serializers
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

# to view our token
#we got those two from docs for token serializers
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# all the routes
# api views allow to view them as api
@api_view(["GET"])
def get_routes(request):
    routes =[
        '/api/token',
        '/api/token/refresh',

    ]
    # response turn to json format
    return Response(routes)


# api views allow to view them as api
@api_view(["GET"])
# to check if user authenticated
@permission_classes([IsAuthenticated])
#
def get_notes(request):
    # get the user
    user = request.user
    # user's all notes
    notes = user.note_set.all()
    # serialize all the notes to turning to json format
    serializer = NoteSerializer(notes,many=True)
    # response turn them to json format
    return Response(serializer.data)
