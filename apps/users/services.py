from django.core.mail import EmailMessage
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth import login

from .models import User


def generate_and_send_code(user: User) -> None:
    """Генерируем код активации и отправляем на почту"""
    user.generate_code()
    user.save()

    subject = 'Sky Invest trading: Activation Code'
    message = f'Ваш код активации аккаунта: {user.code}'
    EmailMessage(subject, message, settings.EMAIL_HOST_USER, [user.email])


def activate_and_login_user(request) -> None:
    """Активируем и авторизовываем пользователя"""

    user = get_object_or_404(User, email=request.session['email'])
    user.is_active = True
    user.save(update_fields=['is_active'])
    login(request, user)


