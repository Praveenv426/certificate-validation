# certificates/admin.py
from django.contrib import admin
from .models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "uploaded_at")
    list_filter = ("uploaded_at", "user")
    search_fields = ("title", "user__username")
