from rest_framework import serializers
from .models import Plan, ActividadPlan
from Tablas.serializers import UserSerializer, DestinationSerializer


class ActividadPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadPlan
        fields = [
            'actividad_plan_id', 'plan_id', 'titulo', 'descripcion',
            'fecha_actividad', 'hora_inicio', 'hora_fin', 'costo',
            'ubicacion', 'orden'
        ]
        read_only_fields = ['actividad_plan_id']


class PlanSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    destino_id = DestinationSerializer(read_only=True)
    actividades = ActividadPlanSerializer(source='actividades', many=True, read_only=True)
    
    class Meta:
        model = Plan
        fields = [
            'plan_id', 'user_id', 'titulo', 'descripcion', 'destino_id',
            'fecha_inicio', 'fecha_fin', 'presupuesto_total', 'estado',
            'is_publico', 'created_at', 'updated_at', 'actividades'
        ]
        read_only_fields = ['plan_id', 'created_at', 'updated_at']

