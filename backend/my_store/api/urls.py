from django.urls import path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from my_store.api.views import (
    ProductViewSet,
    TransactionViewSet,
    OrderViewSet,
    CartViewSet,
    total_store,
)

schema_view = get_schema_view(
    openapi.Info(
        title="Shop API",
        default_version="v1",
        description="Simple API for a shop",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="wknduz@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r"product", ProductViewSet, basename="product")
router.register(r"transaction", TransactionViewSet, basename="transaction")
router.register(r"order", OrderViewSet, basename="order")
router.register(r"cart", CartViewSet, basename="cart")

urlpatterns = [
    path("total-store/", total_store, name="total-store"),
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

urlpatterns += router.urls
