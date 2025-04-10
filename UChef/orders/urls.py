from django.urls import path
from .views import *

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', CartItemCreateView.as_view(), name='cart-add'),
    path('order/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', OrderListView.as_view(), name='order-list'),
]