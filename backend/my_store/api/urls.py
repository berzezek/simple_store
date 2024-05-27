from django.urls import path
from rest_framework.routers import DefaultRouter

from my_store.api.views import (
    ProductViewSet,
    TransactionViewSet,
    OrderViewSet,
    CartViewSet,
    total_store,
)

router = DefaultRouter()
router.register(r"product", ProductViewSet, basename="product")
router.register(r"transaction", TransactionViewSet, basename="transaction")
router.register(r"order", OrderViewSet, basename="order")
router.register(r"cart", CartViewSet, basename="cart")

urlpatterns = [path("total-store/", total_store, name="total-store")]

urlpatterns += router.urls
