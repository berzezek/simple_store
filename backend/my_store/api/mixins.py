from django.utils import timezone
from my_store.api.paginations import ResultsByOnePagination



class TodayHistoryMixin:
    model = None
    pagination_class = ResultsByOnePagination


    def get_queryset(self):
        queryset = self.model.objects.all().order_by("-id")
        is_today = self.request.query_params.get("is-today")
        if is_today == "true":

            today = timezone.now()
            new_queryset = []
            for cart in queryset:
                if cart.history.as_of(today):
                    new_queryset.append(cart)
                    return new_queryset
        return queryset
