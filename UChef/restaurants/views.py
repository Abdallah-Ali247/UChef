from django.shortcuts import render
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from rest_framework.exceptions import PermissionDenied


class RestaurantListView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MenuCategoryListView(generics.ListCreateAPIView):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MenuItemListView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]




from .permissions import IsRestaurant

class MealListView(generics.ListCreateAPIView):
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated, IsRestaurant]

    def get_queryset(self):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            return Meal.objects.none()  # Return an empty queryset for non-restaurant users
        return Meal.objects.filter(restaurant=profile.restaurant)

    def perform_create(self, serializer):
        profile = self.request.user.profile
        
        if profile.role != 'restaurant':
            print("Profile role:", profile.role)
            raise PermissionDenied("You do not have permission to create meals.")

        # Ensure the Profile has a linked Restaurant
        if not hasattr(profile, 'restaurant'):
            raise PermissionDenied("Your profile is missing a linked restaurant. Please contact support.")

        # Automatically associate the meal with the restaurant
        serializer.save(restaurant=profile.restaurant)


class MealDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            return Meal.objects.none()  # Return an empty queryset for non-restaurant users
        return Meal.objects.filter(restaurant=profile.restaurant)

    def perform_update(self, serializer):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            raise PermissionDenied("You do not have permission to update this meal.")
        serializer.save()

    def perform_destroy(self, instance):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            raise PermissionDenied("You do not have permission to delete this meal.")
        instance.delete()




class IngredientListView(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            return Ingredient.objects.none()  # Return an empty queryset for non-restaurant users
        return Ingredient.objects.filter(restaurant=profile.restaurant)

    def perform_create(self, serializer):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            raise PermissionDenied("You do not have permission to create ingredients.")
        # Automatically associate the ingredient with the restaurant
        serializer.save(restaurant=profile.restaurant)




class IngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IngredientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            return Ingredient.objects.none()  # Return an empty queryset for non-restaurant users
        return Ingredient.objects.filter(restaurant=profile.restaurant)

    def perform_update(self, serializer):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            raise PermissionDenied("You do not have permission to update this ingredient.")
        serializer.save()

    def perform_destroy(self, instance):
        profile = self.request.user.profile
        # Ensure the user is a restaurant and has a linked restaurant
        if profile.role != 'restaurant' or not hasattr(profile, 'restaurant'):
            raise PermissionDenied("You do not have permission to delete this ingredient.")
        instance.delete()