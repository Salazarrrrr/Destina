from rest_framework import serializers
from .models import Recomendacion, RecomendacionUsuario
from Tablas.serializers import UserSerializer


class RecomendacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recomendacion
        fields = [
            'recomendacion_id', 'titulo', 'descripcion', 'tipo',
            'rating', 'imagen_url', 'ubicacion', 'precio_estimado',
            'created_at', 'is_active'
        ]
        read_only_fields = ['recomendacion_id', 'created_at']


class RecomendacionUsuarioSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    recomendacion_id = RecomendacionSerializer(read_only=True)
    
    class Meta:
        model = RecomendacionUsuario
        fields = [
            'recomendacion_usuario_id', 'user_id', 'recomendacion_id',
            'fecha_guardada', 'nota_personal'
        ]
        read_only_fields = ['recomendacion_usuario_id', 'fecha_guardada']

