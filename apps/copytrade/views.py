from django.shortcuts import render

from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import TradeGroup
from .serializers import TradeGroupSerializer


class TraderGroupViewSet(CreateModelMixin,
                         GenericViewSet):
    queryset = TradeGroup.objects.all()
    serializer_class = TradeGroupSerializer

    @action(methods=['post'], detail=False)
    def join(self, request):
        return Response({'Hello': 'world'})
