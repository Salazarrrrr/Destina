from django.contrib import admin
from .models import Recomendacion, RecomendacionUsuario


@admin.register(Recomendacion)
class RecomendacionAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'ubicacion', 'rating', 'is_active', 'created_at')
    list_filter = ('tipo', 'is_active', 'created_at')
    search_fields = ('titulo', 'descripcion', 'ubicacion')


@admin.register(RecomendacionUsuario)
class RecomendacionUsuarioAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'recomendacion_id', 'fecha_guardada')
    list_filter = ('fecha_guardada',)
    search_fields = ('user_id__name', 'recomendacion_id__titulo')

