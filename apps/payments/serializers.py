from rest_framework import serializers

from .models import PaymentOrder, PaymentOrderTether


class PaymentOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentOrder
        fields = ('amount',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class PaymentOrderTetherSerializer(serializers.ModelSerializer):
    tx_id = serializers.CharField(allow_blank=True, max_length=260, required=False)

    class Meta:
        model = PaymentOrderTether
        fields = ('id', 'user', 'tx_id', 'created')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)