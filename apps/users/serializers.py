from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .models import User, Trader, Document, DocumentImage, Rating


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'first_name', 'last_name', 'last_login', 'date_joined')


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Создает нового пользователя.
    Все поля обязательны.
    """
    phone_number = serializers.RegexField(regex=r'^\+?1?\d{9,15}$',
                                          error_messages={'invalid phone': 'Неверный формат номера !'})

    # token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'first_name',
                  'last_name', 'password')

    def validate(self, attrs):

        if User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({'phone_number]': 'Данный номер телефона уже был привязан'})
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

        validated_data['trader'] = self.context['request'].user.trader
        document = Document.objects.create(**validated_data)

        for image in images_data:
            DocumentImage.objects.create(document=document, **image)

        return document


class TraderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trader
        fields = ('user', )
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
