from rest_framework import serializers

from .models import PaymentOrder, PaymentOrderTether, Withdraw


class PaymentOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentOrder
        fields = ('amount', 'status', 'created')
        read_only_fields = ['status', 'created']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class PaymentOrderTetherSerializer(serializers.ModelSerializer):
    tx_id = serializers.CharField(allow_blank=True, max_length=260, required=False)

    class Meta:
        model = PaymentOrderTether
        fields = ('id', 'user', 'tx_id', 'created', 'amount', 'status')
        read_only_fields = ['created', 'amount', 'id', 'user', 'status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class WithdrawSerializer(serializers.ModelSerializer):

    class Meta:
        model = Withdraw
        fields = ('address', 'amount', 'created', 'status')
        read_only_fields = ['created', 'status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, attrs):
        user_balance = self.context['request'].user.balance
        if user_balance.balance < attrs.get('amount'):
            raise serializers.ValidationError({'message': 'not_enough_balance'})
        return super().validate(attrs)
