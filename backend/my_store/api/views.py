from rest_framework import viewsets

from my_store.models import Product, Transaction
from my_store.api.serializers import ProductSerializer, TransactionSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer