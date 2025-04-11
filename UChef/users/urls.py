from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    # path('login/', UserLoginView.as_view(), name='user-login'),
    path('login/', LoginView.as_view(), name='login'),
]