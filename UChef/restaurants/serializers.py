from rest_framework import serializers
from .models import Restaurant, MenuCategory, MenuItem

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'description', 'address', 'phone_number', 'is_approved']

class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuCategory
        fields = ['id', 'name']

class MenuItemSerializer(serializers.ModelSerializer):
    category = MenuCategorySerializer(read_only=True)
    restaurant = serializers.StringRelatedField()

    class Meta:
        model = MenuItem
        fields = ['id', 'restaurant', 'category', 'name', 'description', 'price_per_unit', 'available_quantity']



from .models import Meal, Ingredient

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'price']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'price_per_unit', 'stock_quantity']