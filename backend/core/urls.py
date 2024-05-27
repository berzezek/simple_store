from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("my_store.api.urls")),
    re_path(r"^auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
    re_path(r"^auth/", include("djoser.urls.jwt")),
]
