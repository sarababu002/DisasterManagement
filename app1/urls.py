from django.urls import path,include
from rest_framework import routers
from .views import *

router=routers.DefaultRouter()
router.register(r'transportation',TransportationViewSet),
router.register(r'shelters',SheltersViewSet)
router.register(r'ngo',NGOViewSet)
router.register(r'responder',ResponderViewSet)
router.register(r'user',UserViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
   
    
]