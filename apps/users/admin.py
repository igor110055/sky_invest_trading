from django.contrib import admin

from .models import User, Trader, Document, DocumentImage

admin.site.register(Document)
admin.site.register(DocumentImage)


@admin.register(Trader)
class TraderAdmin(admin.ModelAdmin):
    list_display = ['user', 'verified', 'id']
    readonly_fields = ['user']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'id']
    readonly_fields = ['password', 'last_login', 'email', 'date_joined', 'is_staff', 'is_superuser', 'is_active']
