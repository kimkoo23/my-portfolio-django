from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('career/', views.career, name='career'),
    path('skills/', views.skills, name='skills'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
]
