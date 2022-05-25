from rest_framework import serializers

from django.contrib.auth import authenticate

from drf_writable_nested.serializers import WritableNestedModelSerializer

from djoser.serializers import TokenCreateSerializer

from .models import User, Trader, Document, DocumentImage, Rating, Banner, QA
from .utils import get_user_totp_device


class UserSerializer(serializers.ModelSerializer):
    roi_level = serializers.CharField(max_length=10, allow_blank=True)
    profit = serializers.CharField(max_length=10, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'first_name', 'last_name',
                  'last_login', 'date_joined', 'roi_level', 'profit')


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Создает нового пользователя.
    Все поля обязательны.
    """
    phone_number = serializers.RegexField(regex=r'^\+?1?\d{9,15}$',
                                          error_messages={'invalid phone': 'Неверный формат номера !'})

    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'first_name',
                  'last_name', 'password')

    def validate(self, attrs):

        if User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({'phone_number': 'Данный номер телефона уже был привязан'})
        return super().validate(attrs)


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'


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
        fields = ('user', 'binance_api_key')
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
    two_fa_otp = serializers.IntegerField(allow_null=True, required=False)

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
                                "messages": "Введите проверочный код Google authenticator"
                            })
                    except KeyError as e:
                        raise serializers.ValidationError({"messages": "Введите проверочный код Google authenticator"})
                    if not device.verify_token(attrs['two_fa_otp']):
                        raise serializers.ValidationError({"messages": "Ошибка кода подтверждения Google"})
            return attrs
        self.fail("invalid_credentials")


class TOTPUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('otp_for_login', 'otp_for_withdraw')


class FAQSerializer(serializers.ModelSerializer):

    class Meta:
        model = QA
        fields = '__all__'
