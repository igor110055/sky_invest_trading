from django.shortcuts import reverse
from django.http import HttpResponseRedirect
from django.db.models import Prefetch
from django.utils.timezone import make_aware, datetime
from datetime import date
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

from djoser.views import TokenCreateView

from apps.copytrade.serializers import MembershipSerializer
from apps.copytrade.models import Membership
from apps.payments.models import PaymentOrder, PaymentOrderTether, Withdraw
from apps.payments.serializers import WithdrawSerializer


from .models import User, Document, Trader, Banner, QA
from .serializers import TraderSerializer, DocumentSerializer,\
    TraderDashboardSerializer, BannerSerializer, OTPTokenCreateSerializer,\
    TOTPVerifyTokenSerializer, TOTPUpdateSerializer, UserSerializer, \
    FAQSerializer, UserProfileSerializer, UserChangePasswordSerializer,\
    UserPaymentsHistorySerializer, RatingSerializer
from .utils import get_user_totp_device


class TraderViewSet(GenericViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = Trader.objects.all().select_related('user__document')
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=True,
            serializer_class=TraderDashboardSerializer,
            url_name='trader_info')
    def trader_info(self, request, pk, **kwargs):
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

    @action(methods=['post'], detail=True, serializer_class=RatingSerializer)
    def rate(self, request):
        instance = self.get_object()
        serializer = RatingSerializer(data=request.data, context={'request': request, 'trader': instance})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


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
class OTPTokenCreateView(TokenCreateView):
    serializer_class = OTPTokenCreateSerializer


class TOTPViewSet(GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def create(self, request):
        user = request.user
        device = get_user_totp_device(user)
        if not device:
            device = user.totpdevice_set.create(confirmed=False)
        url = device.config_url
        return Response(url, status=status.HTTP_201_CREATED)

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
        return Response({"message": "2fa_error"})

    @action(methods=['post'], serializer_class=TOTPVerifyTokenSerializer,
            detail=False)
    def verify(self, request):
        serializer = TOTPVerifyTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user

        device = get_user_totp_device(user, confirmed=False)
        if not device:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if device.verify_token(serializer.validated_data['token']):
            if not device.confirmed:
                device.confirmed = True
                device.save()
                user.otp_on()
            return Response(True, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, serializer_class=TOTPVerifyTokenSerializer)
    def delete(self, request):
        serializer = TOTPVerifyTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        device = get_user_totp_device(user)

        if device:
            if device.verify_token(serializer.validated_data['token']):
                user.otp_off()
                device.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response({'message': '2fa_error'}, status=status.HTTP_400_BAD_REQUEST)
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


class UserProfileViewSet(GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    @action(methods=['get', 'patch'], detail=False, serializer_class=UserProfileSerializer)
    def profile(self, request):
        if request.method == 'GET':
            serializer = UserProfileSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True, context={'request': request})
        self.perform_update(serializer)
        return Response(status=status.HTTP_202_ACCEPTED)

    @action(methods=['get', 'patch'], detail=False, serializer_class=UserChangePasswordSerializer)
    def change_password(self, request):
        if request.method == 'GET':
            serializer = UserChangePasswordSerializer()
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = UserChangePasswordSerializer(request.user, data=request.data, partial=True, context={'request': request})
        self.perform_update(serializer)
        return Response(status=status.HTTP_202_ACCEPTED)

    @staticmethod
    def perform_update(serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()


class PaymentsHistoryViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        status = self.request.query_params.get('status')

        if self.action == "payments":
            queryset = User.objects.filter(id=self.request.user.id)
            if start_date and end_date and status:
                return queryset.prefetch_related(
                    Prefetch('payments', queryset=PaymentOrder.objects.filter(
                        created__date__range=(start_date, end_date), status=status
                    )),
                    Prefetch('tether_payments', queryset=PaymentOrderTether.objects.filter(
                        created__date__range=(start_date, end_date), status=status)
                             )
                )
            elif start_date and end_date:
                return queryset.prefetch_related(
                    Prefetch('payments', queryset=PaymentOrder.objects.filter(
                        created__date__range=(start_date, end_date))),
                    Prefetch('tether_payments', queryset=PaymentOrderTether.objects.filter(
                        created__date__range=(start_date, end_date)))
                )
            return queryset.prefetch_related('payments', 'tether_payments')
        if self.action == 'withdraws':
            queryset = Withdraw.objects.filter(user=self.request.user)
            if status:
                queryset = queryset.filter(status=status)
            if start_date and end_date:
                return queryset.filter(created__date__range=(start_date, end_date))
            return queryset

        if self.action == 'join_to_groups':
            queryset = Membership.objects.filter(investor=self.request.user).prefetch_related('group')
            if status:
                queryset = queryset.filter(status=status)
            if start_date and end_date:
                return queryset.filter(date_joined__date__range=(start_date, end_date))
            return queryset

    def get_serializer_class(self):
        if self.action == 'payments':
            return UserPaymentsHistorySerializer
        if self.action == 'withdraws':
            return WithdrawSerializer
        if self.action == 'join_to_groups':
            return MembershipSerializer

    @action(methods=['get'], detail=False)
    def payments(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset.first())
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def withdraws(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def join_to_groups(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(methods=['get'], detail=False)
    # def income_from_groups(self, request):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)