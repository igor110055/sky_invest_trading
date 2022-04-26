from django.shortcuts import reverse
from django.http import HttpResponseRedirect

from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.mixins import RetrieveModelMixin

from .models import User, Document, DocumentImage, Trader
from .serializers import TraderSerializer, DocumentSerializer, TraderDashboardSerializer


class TraderViewSet(GenericViewSet):
    model = Trader
    serializer_class = TraderSerializer
    queryset = Trader.objects.filter(verified=True).select_related('document')
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=True,
            serializer_class=TraderDashboardSerializer,
            url_name='trader_info')
    def trader_info(self, request, *args, **kwargs):
        instance = self.get_object()  # TODO: сделать запрос со статистикой
        print(self.lookup_url_kwarg)
        serializer = TraderDashboardSerializer(instance)
        return Response(serializer.data)

    @action(methods=['post'],
            detail=False,
            url_name='trader_application',
            serializer_class=TraderSerializer)
    def apply_for_trader(self, request):
        """Подача заявки что-бы стать трейдером"""
        serializer = TraderSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        request.user.is_trader = True
        request.user.save()
        return HttpResponseRedirect(reverse('trader-apply_for_verification'))

    @action(methods=['get', 'post'],
            detail=False,
            url_name='apply_for_verification',
            serializer_class=DocumentSerializer)
    def apply_for_verification(self, request):
        """Подача документов на верификацию"""
        if request.method == 'GET':
            serializer = DocumentSerializer()
            return Response(serializer.data)

        serializer = DocumentSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

