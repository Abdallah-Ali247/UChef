# permissions.py
from rest_framework.permissions import BasePermission

class IsRestaurant(BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.role == 'restaurant'

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.role == 'admin'