from django.db import models
from users.models import Profile


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    is_approved = models.BooleanField(default=False)  # Admin approval status
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='restaurant')  # Link to Profile


    def __str__(self):
        return self.name

class MenuCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_items')
    category = models.ForeignKey(MenuCategory, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    available_quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"
    



class Meal(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='meals')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='ingredients')
    name = models.CharField(max_length=255)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    



class Cart(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='restaurants_cart')  # Updated related_name
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    meal = models.ForeignKey('Meal', on_delete=models.CASCADE, null=True, blank=True)  # For normal meals
    ingredients = models.ManyToManyField('Ingredient', through='CartItemIngredient')  # For custom meals
    quantity = models.PositiveIntegerField(default=1)
    is_custom = models.BooleanField(default=False)  # True if it's a custom meal

    def get_name(self):
        if self.is_custom:
            # Generate a name based on the ingredients
            ingredient_names = [ingredient.name for ingredient in self.ingredients.all()]
            return f"Custom Meal: {', '.join(ingredient_names)}"
        return self.meal.name if self.meal else "Unnamed Meal"

    def __str__(self):
        if self.is_custom:
            return f"{self.get_name()} ({self.quantity}x)"
        return f"{self.meal.name} in Cart ({self.quantity}x)"    
    
class CartItemIngredient(models.Model):
    cart_item = models.ForeignKey(CartItem, on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.ingredient.name} ({self.quantity})"