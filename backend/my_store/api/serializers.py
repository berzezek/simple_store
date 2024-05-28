from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from my_store.models import Product, Transaction, Order, Cart


class ProductSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Product
        fields = ("id", "title", "description", "tags", "get_last_price")


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
