# certificates/views.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.utils.decorators import method_decorator
from django.views import View

import json

from .models import Certificate

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Username and password are required.'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists.'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User registered successfully.'})

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful.'})
        else:
            return JsonResponse({'error': 'Invalid username or password.'}, status=401)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'Logged out successfully.'})

@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(login_required, name='dispatch')
class ProfileView(View):
    def get(self, request):
        user = request.user
        return JsonResponse({
            'username': user.username,
            'email': user.email,
        })

    def post(self, request):
        data = json.loads(request.body)
        user = request.user

        username = data.get('username')
        email = data.get('email')

        if username:
            user.username = username
        if email:
            user.email = email

        user.save()
        return JsonResponse({'message': 'Profile updated successfully.'})

@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(login_required(login_url=None), name='dispatch')
class UploadCertificateView(View):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required.'}, status=401)
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        title = request.POST.get("title")
        description = request.POST.get("description")
        file = request.FILES.get("file")

        if not title or not file:
            return JsonResponse({"error": "Title and file are required."}, status=400)

        certificate = Certificate.objects.create(
            user=request.user,
            title=title,
            description=description,
            file=file
        )

        return JsonResponse({"message": "Certificate uploaded successfully."})