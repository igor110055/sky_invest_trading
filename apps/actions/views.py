from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.decorators import action

from .models import Action
from .serializers import ActionSerializer


class ActionViewSet(ListModelMixin,
                    GenericViewSet):

    serializer_class = ActionSerializer
    queryset = Action.objects.all()

    def get_queryset(self):
        return self.queryset.objects.filter(user=self.request.user).all()

