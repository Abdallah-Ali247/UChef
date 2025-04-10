from django.urls import path
from .views import RestaurantListView, MenuCategoryListView, MenuItemListView

urlpatterns = [
    path('restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('categories/', MenuCategoryListView.as_view(), name='menu-category-list'),
    path('menu-items/', MenuItemListView.as_view(), name='menu-item-list'),
]