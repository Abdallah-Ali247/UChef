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

# class OrderCreateView(generics.CreateAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         cart = self.request.user.profile.cart
#         total_price = sum(item.total_price() for item in cart.items.all())
#         serializer.save(user=self.request.user.profile, total_price=total_price)
#         cart.items.all().delete()  # Clear the cart after placing the order

# orders/views.py - update the OrderCreateView class
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Get the items from the request
        items_data = request.data.get('items', [])
        total_price = request.data.get('total_price', 0)
        
        # Create the order
        order = Order.objects.create(
            user=request.user.profile,
            total_price=total_price
        )
        
        # Create order items
        for item_data in items_data:
            menu_item_id = item_data.get('menu_item')
            weight = item_data.get('weight')
            quantity = item_data.get('quantity')
            price = item_data.get('price')
            
            OrderItem.objects.create(
                order=order,
                menu_item_id=menu_item_id,
                quantity=quantity,
                weight=weight,
                price=price
            )
        
        # Clear the cart (optional, if you want to maintain cart-clearing behavior)
        try:
            cart = request.user.profile.cart
            cart.items.all().delete()
        except:
            pass
        
        # Return the created order
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user.profile).order_by('-created_at')