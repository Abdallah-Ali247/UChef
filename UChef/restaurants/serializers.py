from rest_framework import serializers
from .models import *

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





class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'description', 'price']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'price_per_unit', 'stock_quantity']






class CartItemIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())

    class Meta:
        model = CartItemIngredient
        fields = ['ingredient', 'quantity']


class CartItemSerializer(serializers.ModelSerializer):
    ingredients = CartItemIngredientSerializer(many=True, write_only=True, required=False)
    name = serializers.SerializerMethodField()  # Define name as a computed field

    class Meta:
        model = CartItem
        fields = ['id', 'meal', 'ingredients', 'quantity', 'is_custom', 'name']

    def get_name(self, obj):
        return obj.get_name()

    def create(self, validated_data):
        # Extract the ingredients data (if provided)
        ingredients_data = validated_data.pop('ingredients', [])
        cart_item = CartItem.objects.create(**validated_data)  # Create the CartItem

        # Calculate the total quantity for custom meals
        if validated_data['is_custom']:
            total_quantity = sum(ingredient_data['quantity'] for ingredient_data in ingredients_data)
            cart_item.quantity = total_quantity
            cart_item.save()

        # Create CartItemIngredient objects for each ingredient (if any)
        for ingredient_data in ingredients_data:
            CartItemIngredient.objects.create(cart_item=cart_item, **ingredient_data)

        return cart_item



class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']