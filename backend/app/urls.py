from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import VulnerabilityViewSet

router = DefaultRouter()

router.register("vulnerabilities", VulnerabilityViewSet,
                basename="vulnerability-view")

urlpatterns = [
    path("", include(router.urls)),
]
