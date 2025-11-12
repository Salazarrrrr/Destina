from django.contrib import admin
from .models import AtraccionDestino, GaleriaDestino, ClimaDestino


@admin.register(AtraccionDestino)
class AtraccionDestinoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'destino_id', 'categoria', 'rating_promedio', 'is_active', 'created_at')
    list_filter = ('categoria', 'is_active', 'created_at')
    search_fields = ('nombre', 'descripcion', 'destino_id__name')
    date_hierarchy = 'created_at'


@admin.register(GaleriaDestino)
class GaleriaDestinoAdmin(admin.ModelAdmin):
    list_display = ('destino_id', 'is_principal', 'orden', 'created_at')
    list_filter = ('is_principal', 'created_at')
    search_fields = ('destino_id__name', 'descripcion')
    ordering = ('destino_id', 'is_principal', 'orden')


@admin.register(ClimaDestino)
class ClimaDestinoAdmin(admin.ModelAdmin):
    list_display = ('destino_id', 'mes', 'temperatura_promedio', 'dias_lluvia')
    list_filter = ('mes',)
    search_fields = ('destino_id__name',)
    ordering = ('destino_id', 'mes')

