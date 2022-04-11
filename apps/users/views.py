from django.shortcuts import render, get_object_or_404, reverse
from django.urls import resolve
from django.http import HttpResponseRedirect

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .models import User, Document, DocumentImage, Trader
from .serializers import UserRegisterSerializer, UserSerializer, UserActivateSerializer, TraderSerializer
from .services import activate_and_login_user, generate_and_send_code


class UserRegisterViewSet(GenericViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=['post', 'get'], detail=False, url_name='register', serializer_class=UserRegisterSerializer)
    def register(self, request):
        """Регистрация пользователя"""
        if request.method == 'GET':
            serializer = UserRegisterSerializer()
            return Response(serializer.data)

        serializer = UserRegisterSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        request.session['email'] = serializer.validated_data['email']

        generate_and_send_code(serializer.instance)
        return HttpResponseRedirect(reverse('user-activate_user'))

    @action(methods=['post', 'get'], detail=False, url_name='activate_user', serializer_class=UserActivateSerializer)
    def activate_user(self, request):
        """Активация пользователя"""
        if request.method == 'GET':
            serializer = UserActivateSerializer()
            return Response(serializer.data)

        serializer = UserActivateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        activate_and_login_user(request)
        return Response(status=status.HTTP_202_ACCEPTED)


class TraderViewSet(ModelViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = Trader.objects.filter(verified=True)

