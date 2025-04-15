from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Restaurant)
admin.site.register(MenuItem)
admin.site.register(MenuCategory)
admin.site.register(Meal)
admin.site.register(Ingredient)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CartItemIngredient)
