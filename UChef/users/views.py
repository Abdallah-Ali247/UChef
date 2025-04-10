from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile

from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from rest_framework.views import APIView


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated users to register

    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=user)  # Automatically generate a token for the new user

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can view/update their profile

    def get_object(self):
        return self.request.user.profile
    

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Generate or retrieve the token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



