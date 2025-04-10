from django.db import models
from restaurants.models import MenuItem
from users.models import Profile

class Cart(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f"Cart of {self.user.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    weight = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)  # Customizable weight

    def total_price(self):
        return self.menu_item.price_per_unit * self.quantity * self.weight

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity} ({self.weight} kg)"

class Order(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled'),
        ],
        default='pending',
    )

    def __str__(self):
        return f"Order #{self.id} by {self.user.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity} ({self.weight} kg)"