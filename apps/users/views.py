from django.shortcuts import reverse
from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import UpdateModelMixin

from djoser.views import TokenCreateView

from .models import User, Document, DocumentImage, Trader, Banner
from .serializers import TraderSerializer, DocumentSerializer,\
    TraderDashboardSerializer, BannerSerializer, OTPTokenCreateSerializer,\
    TOTPUpdateSerializer
from .utils import get_user_totp_device


class TraderViewSet(GenericViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = Trader.objects.filter(verified=True).select_related('document')
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=True,
            serializer_class=TraderDashboardSerializer,
            url_name='trader_info')
    def trader_info(self, request, *args, **kwargs):
        instance = self.get_object()  # TODO: сделать запрос со статистикой
        serializer = TraderDashboardSerializer(instance)
        return Response(serializer.data)

    @action(methods=['post'],
            detail=False,
            url_name='trader_application',
            serializer_class=TraderSerializer)
    def apply_for_trader(self, request):
        """Подача заявки что-бы стать трейдером"""
        serializer = TraderSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        request.user.is_trader = True
        request.user.save()
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


class BannerViewSet(GenericViewSet):
    model = Banner
    serializer_class = BannerSerializer
    queryset = Banner.objects.all()
    permission_classes = [AllowAny]

    @action(methods=['get'], detail=False, serializer_class=BannerSerializer)
    def get_banner(self, request):
        banner = self.queryset.last()
        serializer = BannerSerializer(banner)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 2fa

class TOTPCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        device = get_user_totp_device(user)
        if not device:
            device = user.totpdevice_set.create(confirmed=True)
        url = device.config_url
        return Response(url, status=status.HTTP_201_CREATED)


class TOTPVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, token):
        user = request.user
        device = get_user_totp_device(user)
        if not device == None and device.verify_token(token):
            if not device.confirmed:
                device.confirmed = True
                device.save()
            return Response(True, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class OTPTokenCreateView(TokenCreateView):
    serializer_class = OTPTokenCreateSerializer


class TOTPUpdateViewSet(GenericViewSet):
    serializer_class = TOTPUpdateSerializer
    queryset = User.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    @action(methods=['get', 'patch'], serializer_class=TOTPUpdateSerializer, detail=False)
    def update_otp(self, request, *args, **kwargs):
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)

        device = get_user_totp_device(request.user)
        if device and device.confirmed:
            partial = kwargs.pop('partial', False)
            serializer = self.get_serializer(data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            serializer.update(request.user, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response({"message": "2fa аутентификация не активирована"})

