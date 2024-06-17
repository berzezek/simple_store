from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from rest_framework import filters, viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from my_store.api.mixins import TodayHistoryMixin
from my_store.api.serializers import (
    ProductSerializer,
    TransactionSerializer,
    OrderSerializer,
    CartSerializer,
)
from my_store.models import Product, Transaction, Order, Cart


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        queryset = Product.objects.all()
        title = self.request.query_params.get("title", None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class OrderViewSet(TodayHistoryMixin, viewsets.ModelViewSet):
    model = Order
    serializer_class = OrderSerializer


class CartViewSet(TodayHistoryMixin, viewsets.ModelViewSet):
    model = Cart
    serializer_class = CartSerializer


@csrf_exempt
@api_view(["GET"])
def total_store(request):

    transactions = Transaction.objects.all()
    # Агрегация транзакций
    aggregated_data = transactions.values("product").annotate(
        total_quantity=Sum("quantity")
    )

    # Получение последней цены с положительным количеством
    for item in aggregated_data:
        last_positive_price_transaction = (
            Transaction.objects.filter(product_id=item["product"], quantity__gt=0)
            .order_by(
                "-id"
            )  # предположим, что id можно использовать для определения последней записи
            .first()
        )
        if last_positive_price_transaction:
            item["last_price"] = last_positive_price_transaction.price
        else:
            item["last_price"] = 0  # или любое значение по умолчанию

        item["total_price"] = item["last_price"] * item["total_quantity"]

    return Response(aggregated_data, status=status.HTTP_200_OK)
