from django.shortcuts import reverse
from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import RetrieveModelMixin

from .models import User, Document, DocumentImage, Trader
from .serializers import UserRegisterSerializer, UserSerializer,\
    UserActivateSerializer, TraderSerializer, DocumentSerializer, DocumentImageSerializer


# class UserRegisterViewSet(GenericViewSet):
#     model = User
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

# @action(methods=['post', 'get'], detail=False, url_name='register', serializer_class=UserRegisterSerializer)
# def register(self, request):
#     """Регистрация пользователя"""
#     if request.method == 'GET':
#         serializer = UserRegisterSerializer()
#         return Response(serializer.data)
#
#     serializer = UserRegisterSerializer(data=request.data, context={'request': request})
#     serializer.is_valid(raise_exception=True)
#     serializer.save()
#
#     request.session['email'] = serializer.validated_data['email']
#
#     generate_and_send_code(serializer.instance)
#     return HttpResponseRedirect(reverse('user-activate_user'))
#
# @action(methods=['post', 'get'], detail=False, url_name='activate_user', serializer_class=UserActivateSerializer)
# def activate_user(self, request):
#     """Активация пользователя"""
#     if request.method == 'GET':
#         serializer = UserActivateSerializer()
#         return Response(serializer.data)
#
#     serializer = UserActivateSerializer(data=request.data, context={'request': request})
#     serializer.is_valid(raise_exception=True)
#
#     token = activate_and_login_user(request)
#     return Response(status=status.HTTP_202_ACCEPTED, data=token)
#
# @action(methods=['get', 'post'],
#         detail=False,
#         url_name='login_user',
#         serializer_class=LoginSerializer)
# def login_user(self, request):
#     """Авторизация пользователя"""
#     if request.method == 'GET':
#         serializer = LoginSerializer()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     serializer = LoginSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#
#     return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class TraderViewSet(RetrieveModelMixin,
                    GenericViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = Trader.objects.filter(verified=True).select_related('document')
    permission_classes = [IsAuthenticated]

    @action(methods=['post'],
            detail=False,
            url_name='trader_application',
            serializer_class=TraderSerializer)
    def apply_for_trader(self, request):
        """Подача заявки что-бы стать трейдером"""
        serializer = TraderSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return HttpResponseRedirect(reverse('trader-apply_for_verification'))

    @action(methods=['get', 'post'],
            detail=False,
            url_name='apply_for_verification',
            serializer_class=DocumentSerializer)
    def apply_for_verification(self, request):
        """Подача документов на верификацию"""
        if request.method == 'GET':
            serializer = DocumentSerializer()
            return Response(serializer.data)

        serializer = DocumentSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

