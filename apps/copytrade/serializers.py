from rest_framework import serializers

from .models import TradeGroup


class TradeGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = TradeGroup
        fields = '__all__'
