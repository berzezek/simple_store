from rest_framework.routers import DefaultRouter

from my_store.api.views import (
    ProductViewSet,
    TransactionViewSet,
)

router = DefaultRouter()
router.register(r"product", ProductViewSet, basename="product")
router.register(r"transaction", TransactionViewSet, basename="transaction")

urlpatterns = router.urls
