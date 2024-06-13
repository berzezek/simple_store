from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from my_store.models import Product, Transaction, Order, Cart


class ProductSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Product
        fields = ("id", "title", "description", "tags", "get_last_price")


class TransactionSerializer(serializers.ModelSerializer):
    related_object = serializers.SerializerMethodField()
    content_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            "id",
            "related_object",
            "price",
            "quantity",
            "object_id",
            "product",
            "content_type_name",
        ]

    def get_related_object(self, obj):
        try:
            if obj.content_type.model == "order":
                related_object = Order.objects.get(id=obj.object_id)
                return OrderSerializer(related_object).data
            elif obj.content_type.model == "cart":
                related_object = Cart.objects.get(id=obj.object_id)
                return CartSerializer(related_object).data
        except (Order.DoesNotExist, Cart.DoesNotExist):
            return None

    def get_content_type_name(self, obj):
        return obj.content_type.model


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
