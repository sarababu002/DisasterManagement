from imaplib import _Authenticator
from django.shortcuts import render
from django.contrib.auth.models import User
from app1.models import Transportation
from .serializers import *
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
# Create your views here.
class TransportationViewSet(viewsets.ModelViewSet):
    queryset=Transportation.objects.all()
    serializer_class=TransportationSerializer


class SheltersViewSet(viewsets.ModelViewSet):
    queryset=Shelters.objects.all()
    serializer_class=SheltersSerializer

class NGOViewSet(viewsets.ModelViewSet):
    queryset=NGO.objects.all()
    serializer_class=NGOSerializer

class ResponderViewSet(viewsets.ModelViewSet):
    queryset=Responder.objects.all()
    serializers__class=ResponderSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
 
 
class LoginView(APIView):
    permission_classes = [AllowAny]
 
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
       
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'role': user.role,
                    'phone_no' : user.phone_no,
                }
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)