from rest_framework import serializers

from .models import TradeGroup, Membership


class TradeGroupSerializer(serializers.ModelSerializer):
    amount_collected = serializers.IntegerField(allow_null=True, required=False)
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    email = serializers.EmailField(allow_blank=True, required=False)

    class Meta:
        model = TradeGroup
        fields = '__all__'
        read_only_fields = ('trader', 'slug', 'created', 'id')


class TradeGroupCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TradeGroup
        fields = ('title', 'description', 'group_size',
                  'need_sum', 'percent_from_income',
                  'min_entry_sum', 'max_entry_sum',
                  'start_date', 'end_date')

    def create(self, validated_data):
        validated_data['trader'] = self.context['request'].user.trader
        return super().create(validated_data)


class MembershipSerializer(serializers.ModelSerializer):
    group = TradeGroupSerializer()

    class Meta:
        model = Membership
        fields = '__all__'
        read_only_fields = ('investor', 'date_joined')

    def validate(self, attrs):
        group = TradeGroup.objects.get(id=attrs['group'].id)
        user = self.context['request'].user

        if attrs['invested_sum'] > user.balance.balance:
            raise serializers.ValidationError({'message': 'Нехватает баланса'})

        if Membership.objects.filter(
                investor=user.id,
                group=attrs['group'].id
        ).exists():
            raise serializers.ValidationError({'message': 'Вы уже присоединились к этой группе'})

        if attrs['invested_sum'] < group.min_entry_sum:
            raise serializers.ValidationError({'message': 'Ошибка минимальной суммы входа'})

        elif attrs['invested_sum'] > group.max_entry_sum:
            raise serializers.ValidationError({'message': 'Ошибка максимальной суммы входа'})

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data['investor'] = self.context['request'].user
        return super().create(validated_data)
