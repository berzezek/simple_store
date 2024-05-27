from rest_framework import serializers
from my_store.models import Product, Transaction, Order, Cart


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


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