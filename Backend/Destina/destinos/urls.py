from django.urls import path
from .views import (
    AtraccionDestinoListView,
    AtraccionDestinoDetailView,
    GaleriaDestinoView,
    ClimaDestinoView
)

urlpatterns = [
    path('<int:destino_id>/atracciones/', AtraccionDestinoListView.as_view(), name='atracciones-destino'),
    path('atracciones/<int:atraccion_id>/', AtraccionDestinoDetailView.as_view(), name='atraccion-detail'),
    path('<int:destino_id>/galeria/', GaleriaDestinoView.as_view(), name='galeria-destino'),
    path('<int:destino_id>/clima/', ClimaDestinoView.as_view(), name='clima-destino'),
]

