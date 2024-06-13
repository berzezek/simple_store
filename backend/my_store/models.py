from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from simple_history.models import HistoricalRecords
from taggit.managers import TaggableManager


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    tags = TaggableManager()

    def get_last_price(self):
        last_transaction = self.transactions.last()
        if last_transaction:
            return last_transaction.price
        return 0


class Transaction(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="transactions"
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    quantity = models.IntegerField()
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={"model__in": ("order", "cart")},
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        if self.price is None:
            last_price = Transaction.objects.filter(product=self.product).last()
            if last_price:
                self.price = last_price.price
            else:
                self.price = 0
        super().save(*args, **kwargs)

    @classmethod
    def create_with_content_object(cls, product, price, quantity, content_object):
        content_type = ContentType.objects.get_for_model(content_object)
        return cls.objects.create(
            product=product,
            price=price,
            quantity=quantity,
            content_type=content_type,
            object_id=content_object.id,
        )


class Order(models.Model):
    bayer = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="orders"
    )
    history = HistoricalRecords()


class Cart(models.Model):
    seller = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="carts"
    )
    history = HistoricalRecords()
