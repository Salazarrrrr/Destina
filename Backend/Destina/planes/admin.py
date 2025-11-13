from django.contrib import admin
from .models import Plan, ActividadPlan


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'user_id', 'destino_id', 'fecha_inicio', 'fecha_fin', 'estado', 'is_publico', 'created_at')
    list_filter = ('estado', 'is_publico', 'created_at')
    search_fields = ('titulo', 'descripcion', 'user_id__name')
    date_hierarchy = 'fecha_inicio'


@admin.register(ActividadPlan)
class ActividadPlanAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'plan_id', 'fecha_actividad', 'hora_inicio', 'costo', 'orden')
    list_filter = ('fecha_actividad',)
    search_fields = ('titulo', 'descripcion', 'plan_id__titulo')
    ordering = ('plan_id', 'fecha_actividad', 'orden')

