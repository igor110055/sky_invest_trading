from rest_framework import serializers

from .models import TradeGroup, Membership


class TradeGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = TradeGroup
        fields = '__all__'
        read_only_fields = ('trader', 'slug', 'created', 'id')


class TradeGroupCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TradeGroup
        fields = ('title', 'description', 'group_size', 'need_sum', 'min_entry_sum', 'max_entry_sum')

    def create(self, validated_data):
        validated_data['trader'] = self.context['request'].user.trader
        return super().create(validated_data)


class MembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership
        fields = '__all__'
        read_only_fields = ('investor', 'date_joined')

    def validate(self, attrs):
        group = TradeGroup.objects.get(id=attrs['group'].id)
        user = self.context['request'].user

        if attrs['invested_sum'] > user.balance.balance:
            raise serializers.ValidationError({'message': 'not enough balance'})

        if Membership.objects.filter(
                investor=user.id,
                group=attrs['group'].id
        ).exists():
            raise serializers.ValidationError({'message': 'user already joined to this group'})

        if attrs['invested_sum'] < group.min_entry_sum:
            raise serializers.ValidationError({'message': 'min entry sum error'})

        elif attrs['invested_sum'] > group.max_entry_sum:
            raise serializers.ValidationError({'message': 'max entry sum error'})

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data['investor'] = self.context['request'].user
        return super().create(validated_data)
