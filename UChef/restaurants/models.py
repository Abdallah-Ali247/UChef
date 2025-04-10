from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    is_approved = models.BooleanField(default=False)  # Admin approval status

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