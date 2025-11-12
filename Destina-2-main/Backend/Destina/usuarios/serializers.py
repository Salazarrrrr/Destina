from rest_framework import serializers
from .models import PerfilUsuario, SeguimientoUsuario, ResenaUsuario
from Tablas.serializers import UserSerializer


class PerfilUsuarioSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    
    class Meta:
        model = PerfilUsuario
        fields = [
            'perfil_id', 'user_id', 'telefono', 'fecha_nacimiento',
            'bio', 'avatar_url', 'pais', 'ciudad', 'preferencias_viaje',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['perfil_id', 'created_at', 'updated_at']


class SeguimientoUsuarioSerializer(serializers.ModelSerializer):
    seguidor_id = UserSerializer(read_only=True)
    seguido_id = UserSerializer(read_only=True)
    
    class Meta:
        model = SeguimientoUsuario
        fields = ['seguimiento_id', 'seguidor_id', 'seguido_id', 'created_at']
        read_only_fields = ['seguimiento_id', 'created_at']


class ResenaUsuarioSerializer(serializers.ModelSerializer):
    usuario_resenado_id = UserSerializer(read_only=True)
    usuario_resenador_id = UserSerializer(read_only=True)
    
    class Meta:
        model = ResenaUsuario
        fields = [
            'resena_id', 'usuario_resenado_id', 'usuario_resenador_id',
            'rating', 'comentario', 'created_at'
        ]
        read_only_fields = ['resena_id', 'created_at']

