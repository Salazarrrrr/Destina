from django.urls import path
from .views import (
    RecomendacionListView,
    RecomendacionDetailView,
    GuardarRecomendacionView,
    MisRecomendacionesView
)

urlpatterns = [
    path('', RecomendacionListView.as_view(), name='recomendacion-list'),
    path('<int:recomendacion_id>/', RecomendacionDetailView.as_view(), name='recomendacion-detail'),
    path('<int:recomendacion_id>/guardar/', GuardarRecomendacionView.as_view(), name='guardar-recomendacion'),
    path('mis-recomendaciones/', MisRecomendacionesView.as_view(), name='mis-recomendaciones'),
]

