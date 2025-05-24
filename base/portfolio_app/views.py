from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def career(request):
    return render(request, 'career.html')

def skills(request):
    return render(request, 'skills.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    return render(request, 'contact.html')

def aniPortfolio(request):
    return render(request, 'aniPortfolio.html')