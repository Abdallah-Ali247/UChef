from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Cart, CartItem, Order, OrderItem
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user.profile)
        return cart

class CartItemCreateView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        cart = self.request.user.profile.cart
        total_price = sum(item.total_price() for item in cart.items.all())
        serializer.save(user=self.request.user.profile, total_price=total_price)
        cart.items.all().delete()  # Clear the cart after placing the order