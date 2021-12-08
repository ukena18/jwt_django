from django.urls import path
from . import views
from.views import MyTokenObtainPairView
#we got those two from docs for token serializers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # basic api options
    path("",views.get_routes),
    # to the notes api
    path("notes/",views.get_notes),
    # to get token it need username and password from user
    #
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #we got those two from docs for token serializers
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

