from rest_framework import serializers

from .models import PaymentOrder


class PaymentOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentOrder
        fields = ('amount', )

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
