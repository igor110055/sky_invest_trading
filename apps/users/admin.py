from django.contrib import admin

from .models import User, Trader, Document, DocumentImage

admin.site.register(User)
admin.site.register(Trader)
admin.site.register(Document)
admin.site.register(DocumentImage)
