from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from .models import User, Trader, Document, DocumentImage, Rating


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'first_name', 'last_name', 'city')


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
                  'last_name', 'city', 'password')

    def validate(self, attrs):

        if User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({'phone_number]': 'Данный номер телефона уже был привязан'})
        return super().validate(attrs)


class UserActivateSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)

    class Meta:
        fields = ('code',)

    def validate(self, attrs):
        user = get_object_or_404(User, email=self.context['request'].session['email'])

        if not user.code == attrs['code']:
            raise serializers.ValidationError({'code': 'Введен не верный код активации'})
        return super().validate(attrs)


class LoginSerializer(serializers.Serializer):
    """
    Аутентифицирует имеющегося пользователя.
    email и password обязательны.
    Возвращает JSON web token
    """
    email = serializers.EmailField(write_only=True, required=True)
    password = serializers.CharField(max_length=150, write_only=True, required=True)

    def validate(self, attrs):
        user = authenticate(email=attrs['email'], password=attrs['password'])

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        return {'token': user.token}


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'


class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension, )
            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


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

    # def create(self, validated_data):
    #     images_data = validated_data.pop('images')
    #
    #     validated_data['trader'] = self.context['request'].user.trader
    #     document = Document.objects.create(**validated_data)
    #
    #     for image in images_data:
    #         DocumentImage.objects.create(document=document, **image)
    #
    #     return document


class TraderSerializer(serializers.ModelSerializer):
    document = DocumentSerializer()

    class Meta:
        model = Trader
        fields = ('user', 'document')
        read_only_fields = ['user', 'document']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
