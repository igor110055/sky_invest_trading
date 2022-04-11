from rest_framework import serializers

from django.shortcuts import get_object_or_404

from .models import User, Trader, Document, DocumentImage


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'first_name', 'last_name', 'city')


class UserRegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=150,
                                     required=True,
                                     label='password', style={'input_type': 'password'})
    password2 = serializers.CharField(max_length=150,
                                      required=True,
                                      label='password', style={'input_type': 'password'})
    phone_number = serializers.RegexField(regex=r'^\+?1?\d{9,15}$',
                                          error_messages={'invalid phone': 'Неверный формат номера !'})

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'first_name', 'last_name', 'city', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Пароли не совпадают'})

        if User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({'password': 'Данный номер телефона уже был привязан'})

        del attrs['password2']
        return attrs


class UserActivateSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)

    class Meta:
        fields = ('code',)

    def validate(self, attrs):
        user = get_object_or_404(User, email=self.context['request'].session['email'])

        if not user.code == attrs['code']:
            raise serializers.ValidationError({'code': 'Введен не верный код активации'})
        return attrs


class TraderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trader
        fields = ('user', 'verified')
