from django.contrib import admin
from .models import PerfilUsuario, SeguimientoUsuario, ResenaUsuario


@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'pais', 'ciudad', 'created_at')
    list_filter = ('pais', 'created_at')
    search_fields = ('user_id__name', 'user_id__email', 'pais', 'ciudad')


@admin.register(SeguimientoUsuario)
class SeguimientoUsuarioAdmin(admin.ModelAdmin):
    list_display = ('seguidor_id', 'seguido_id', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('seguidor_id__name', 'seguido_id__name')


@admin.register(ResenaUsuario)
class ResenaUsuarioAdmin(admin.ModelAdmin):
    list_display = ('usuario_resenado_id', 'usuario_resenador_id', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('usuario_resenado_id__name', 'usuario_resenador_id__name', 'comentario')

