from django.contrib import admin

from .models import User, Trader, Document, DocumentImage, Balance, Banner

admin.site.register(Document)
admin.site.register(DocumentImage)
admin.site.register(Balance)
admin.site.register(Banner)


@admin.register(Trader)
class TraderAdmin(admin.ModelAdmin):
    list_display = ['user', 'id']
    readonly_fields = ['user']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'id']
    list_display_links = ['email']
    readonly_fields = ['last_login', 'date_joined', 'is_staff', 'is_superuser']

