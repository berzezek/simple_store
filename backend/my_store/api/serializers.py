from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer

from my_store.models import Product, Transaction, Order, Cart


class ProductSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Product
        fields = ("id", "title", "description", "tags", "get_last_price")


class TransactionSerializer(serializers.ModelSerializer):
    content_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = "__all__"

    def get_content_type_name(self, obj):
        return obj.content_type.model


class OrderSerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(
            content_type__model="order", object_id=obj.id
        )
        return TransactionSerializer(transactions, many=True).data


class CartSerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = "__all__"

    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(
            content_type__model="cart", object_id=obj.id
        )
        return TransactionSerializer(transactions, many=True).data
