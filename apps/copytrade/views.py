from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings

from .models import TradeGroup
from .serializers import TradeGroupSerializer, MembershipSerializer, TradeGroupCreateSerializer
from .tasks import withdraw_after_join_to_group

from apps.actions.tasks import action_trade_group
from apps.api.permissions import IsTrader


class TraderGroupViewSet(RetrieveModelMixin,
                         ListModelMixin,
                         GenericViewSet):
    queryset = TradeGroup.objects.all()
    serializer_class = TradeGroupSerializer
    permission_classes = [IsTrader]

    def get_serializer_class(self):
        if self.action == 'create':
            return TradeGroupCreateSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        action_trade_group.delay(serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['post', 'get'], detail=False,
            serializer_class=MembershipSerializer,
            permission_classes=[IsAuthenticated])
    def join(self, request):
        if request.method == 'GET':
            serializer = MembershipSerializer()
            return Response(serializer.data)

        serializer = MembershipSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        withdraw_after_join_to_group.delay(serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @staticmethod
    def get_success_headers(data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}