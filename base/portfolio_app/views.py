from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def career(request):
    return render(request, 'career.html')

