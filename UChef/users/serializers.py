from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from restaurants.models import Restaurant



class UserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=Profile.ROLE_CHOICES, default='user', write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']  # Remove 'role' from fields
        extra_kwargs = {'password': {'write_only': True}}  # Password should not be readable

    def create(self, validated_data):
        # Extract the role from the request data (if provided)
        role = validated_data.pop('role', 'user') # Default role is 'user'
        print(f"Role received: {role}")
        
        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Create or update the associated Profile
        profile, created = Profile.objects.get_or_create(user=user, defaults={'role': role})
        
        if not created:
            profile.role = role  # Update role if the profile already exists
            profile.save()
        # If the role is "restaurant", create a Restaurant object
        if role == 'restaurant':
            Restaurant.objects.get_or_create(name=f"{user.username}'s Restaurant", profile=profile)

        return user



class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = serializers.CharField(read_only=True)  # Include the role field

    class Meta:
        model = Profile
        fields = ['user', 'phone_number', 'address', 'role']  # Add 'role' to fields



from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        data['user'] = user
        return data