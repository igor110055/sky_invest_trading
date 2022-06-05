from rest_framework import serializers

from django.contrib.auth import authenticate

from drf_writable_nested.serializers import WritableNestedModelSerializer

from djoser.serializers import TokenCreateSerializer
from djoser.conf import settings
from django_otp.plugins.otp_totp.models import TOTPDevice

from .models import User, Trader, Document, DocumentImage, Rating, Banner, QA, Balance
from .utils import get_user_totp_device

from apps.payments.serializers import PaymentOrderSerializer, PaymentOrderTetherSerializer


class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ('balance',)


class UserSerializer(serializers.ModelSerializer):
    roi_level = serializers.CharField(max_length=10, allow_blank=True)
    profit = serializers.CharField(max_length=10, allow_blank=True)
    balance = UserBalanceSerializer()

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'first_name', 'last_name',
                  'last_login', 'date_joined', 'roi_level', 'profit', 'is_trader', 'balance')


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ('star',)

    def validate(self, attrs):
        if self.context['request'].user == self.context['instance'].user:
            raise serializers.ValidationError({'message': 'Вы не можете оценивать себя'})
        return super().validate(attrs)


class DocumentImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = DocumentImage
        fields = ('image', )


class DocumentSerializer(WritableNestedModelSerializer):
    images = DocumentImageSerializer(many=True)

    class Meta:
        model = Document
        fields = ('first_name', 'last_name', 'birth_day',
                  'passport_number', 'inn', 'country', 'city',
                  'address', 'images')

    def create(self, validated_data):
        images_data = validated_data.pop('images')

        validated_data['user'] = self.context['request'].user
        document = Document.objects.create(**validated_data)

        for image in images_data:
            DocumentImage.objects.create(document=document, **image)

        return document


class TraderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trader
        fields = ('user', 'binance_api_key', 'binance_secret_key')
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class TraderStatisticSerializer(serializers.Serializer):
    roi_statistic = serializers.DecimalField(max_digits=6, decimal_places=2)
    profit = serializers.DecimalField(max_digits=6, decimal_places=2)
    people_in_groups = serializers.IntegerField()
    people_copying = serializers.IntegerField()
    income_of_groups = serializers.IntegerField()
    admission_to_groups = serializers.IntegerField()


class TraderDashboardSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    statistic = TraderStatisticSerializer()
    document = DocumentSerializer()

    class Meta:
        model = Trader
        fields = ('user', 'statistic', 'document')


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('image',)


class OTPTokenCreateSerializer(TokenCreateSerializer):
    two_fa_otp = serializers.CharField(required=False, max_length=6, allow_blank=True)

    def validate(self, attrs):
        password = attrs.get("password")
        params = {'email': attrs.get('email')}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail("invalid_credentials")

        if self.user and self.user.is_active:
            if self.user.otp_for_login:
                device = get_user_totp_device(self.user)

                if device and device.confirmed:
                    try:
                        code = attrs['two_fa_otp']
                        if not code:
                            raise serializers.ValidationError({
                                "message": "2fa_error"
                            })
                    except KeyError as e:
                        raise serializers.ValidationError({"message": "2fa_error"})
                    if not device.verify_token(attrs['two_fa_otp']):
                        raise serializers.ValidationError({"message": "2fa_invalid"})

        password = attrs.get("password")
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                raise serializers.ValidationError({'message': 'password_error'})
        if self.user and self.user.is_active:
            return attrs
        raise serializers.ValidationError({'message': 'inactive_user'})


class FAQSerializer(serializers.ModelSerializer):

    class Meta:
        model = QA
        fields = '__all__'


class TOTPUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('otp_for_login', 'otp_for_withdraw')


class TOTPVerifyTokenSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=6)

    class Meta:
        model = TOTPDevice
        fields = ('token', )


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'first_name', 'last_name')


class UserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length=128, style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(max_length=128, style={"input_type": "password"}, required=True)
    new_password2 = serializers.CharField(max_length=128, style={"input_type": "password"}, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'new_password', 'new_password2')

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({'message': 'password_error'})
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({'message': 'password_invalid'})
        return super().validate(attrs)

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance


class UserPaymentsHistorySerializer(serializers.ModelSerializer):
    payments = PaymentOrderSerializer(many=True, read_only=True)
    tether_payments = PaymentOrderTetherSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('payments', 'tether_payments')

