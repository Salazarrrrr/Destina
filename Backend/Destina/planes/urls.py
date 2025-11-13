from django.urls import path
from .views import (
    PlanListView,
    PlanDetailView,
    MisPlanesView,
    ActividadPlanView
)

urlpatterns = [
    path('', PlanListView.as_view(), name='plan-list'),
    path('mis-planes/', MisPlanesView.as_view(), name='mis-planes'),
    path('<int:plan_id>/', PlanDetailView.as_view(), name='plan-detail'),
    path('<int:plan_id>/actividades/', ActividadPlanView.as_view(), name='actividades-plan'),
]

