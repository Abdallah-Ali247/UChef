from django.urls import path
from .views import *

urlpatterns = [
    path('restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('categories/', MenuCategoryListView.as_view(), name='menu-category-list'),
    path('menu-items/', MenuItemListView.as_view(), name='menu-item-list'),

    path('meals/', MealListView.as_view(), name='meal-list'),
    path('meals/<int:pk>/', MealDetailView.as_view(), name='meal-detail'),
    path('ingredients/', IngredientListView.as_view(), name='ingredient-list'),
    path('ingredients/<int:pk>/', IngredientDetailView.as_view(), name='ingredient-detail'),
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),


]