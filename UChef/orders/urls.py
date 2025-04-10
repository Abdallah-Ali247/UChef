from django.urls import path
from .views import CartView, CartItemCreateView, OrderCreateView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', CartItemCreateView.as_view(), name='cart-add'),
    path('order/create/', OrderCreateView.as_view(), name='order-create'),
]