from django.shortcuts import reverse
from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

from djoser.views import TokenCreateView
from django_otp.plugins.otp_totp.models import TOTPDevice

from apps.copytrade.serializers import MembershipSerializer

from .models import User, Document, DocumentImage, Trader, Banner, QA
from .serializers import TraderSerializer, DocumentSerializer,\
    TraderDashboardSerializer, BannerSerializer, OTPTokenCreateSerializer,\
    TOTPVerifyTokenSerializer, TOTPUpdateSerializer, UserSerializer, FAQSerializer
from .utils import get_user_totp_device


class TraderViewSet(GenericViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = User.objects.filter(is_trader=True, verified=True).select_related('document')
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
        return HttpResponseRedirect(reverse('users-verification'))


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
            device = user.totpdevice_set.create(confirmed=False)
        url = device.config_url
        return Response(url, status=status.HTTP_201_CREATED)


class OTPTokenCreateView(TokenCreateView):
    serializer_class = OTPTokenCreateSerializer


class TOTPViewSet(GenericViewSet):
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

    @action(methods=['post'], serializer_class=TOTPVerifyTokenSerializer,
            detail=False)
    def verify(self, request):
        serializer = TOTPVerifyTokenSerializer(data=request.data)
        user = request.user

        device = get_user_totp_device(user)
        if not device == None and device.verify_token(serializer.validated_data['token']):
            if not device.confirmed:
                device.confirmed = True
                device.save()
            return Response(True, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, serializer_class=TOTPVerifyTokenSerializer)
    def delete(self, request):
        serializer = TOTPVerifyTokenSerializer(data=request.data)
        user = request.user
        device = get_user_totp_device(user)

        if device:
            if device.verify_token(serializer.validated_data['token']):
                user.otp_off()
                device.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response({'message': 'Ошибка кода подтверждения Google'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)


class VerificationView(GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    @action(methods=['post'], detail=False)
    def verification(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class InvestorDashboardView(GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.with_roi_level_and_profit().filter(is_active=True)
    serializer_class = UserSerializer

    @action(methods=['get'], detail=False)
    def dashboard(self, request):
        instance = self.queryset.get(id=request.user.id)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(methods=['get'], detail=False, serializer_class=MembershipSerializer)
    def groups(self, request):
        instance = self.queryset.get(id=request.user.id)
        serializer = MembershipSerializer(instance.memberships.prefetch_related('group'), many=True)
        return Response(serializer.data)


class FAQView(GenericViewSet):
    permission_classes = [AllowAny]
    serializer_class = FAQSerializer
    queryset = QA.objects.all()

    @action(methods=['get'], detail=False)
    def get(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
