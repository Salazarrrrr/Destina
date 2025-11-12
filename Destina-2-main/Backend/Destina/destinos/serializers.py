from rest_framework import serializers
from .models import AtraccionDestino, GaleriaDestino, ClimaDestino
from Tablas.serializers import DestinationSerializer


class AtraccionDestinoSerializer(serializers.ModelSerializer):
    destino_id = DestinationSerializer(read_only=True)
    
    class Meta:
        model = AtraccionDestino
        fields = [
            'atraccion_id', 'destino_id', 'nombre', 'descripcion', 'categoria',
            'latitud', 'longitud', 'imagen_url', 'precio_entrada',
            'horario_apertura', 'horario_cierre', 'rating_promedio',
            'is_active', 'created_at'
        ]
        read_only_fields = ['atraccion_id', 'created_at']


class GaleriaDestinoSerializer(serializers.ModelSerializer):
    destino_id = DestinationSerializer(read_only=True)
    
    class Meta:
        model = GaleriaDestino
        fields = [
            'galeria_id', 'destino_id', 'imagen_url', 'descripcion',
            'is_principal', 'orden', 'created_at'
        ]
        read_only_fields = ['galeria_id', 'created_at']


class ClimaDestinoSerializer(serializers.ModelSerializer):
    destino_id = DestinationSerializer(read_only=True)
    mes_nombre = serializers.CharField(source='get_mes_display', read_only=True)
    
    class Meta:
        model = ClimaDestino
        fields = [
            'clima_id', 'destino_id', 'mes', 'mes_nombre',
            'temperatura_promedio', 'temperatura_min', 'temperatura_max',
            'dias_lluvia', 'descripcion'
        ]
        read_only_fields = ['clima_id']

