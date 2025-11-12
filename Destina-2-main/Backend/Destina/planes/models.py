from django.db import models
from django.core.validators import MinValueValidator

# Plan de Viaje Model
class Plan(models.Model):
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('publicado', 'Publicado'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado'),
    ]
    
    plan_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='planes')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    destino_id = models.ForeignKey('Tablas.Destination', on_delete=models.CASCADE, related_name='planes')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    presupuesto_total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    is_publico = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titulo} - {self.user_id.name}"

    class Meta:
        db_table = 'plan'


# Actividad del Plan Model
class ActividadPlan(models.Model):
    actividad_plan_id = models.AutoField(primary_key=True)
    plan_id = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='actividades')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    fecha_actividad = models.DateField()
    hora_inicio = models.TimeField(blank=True, null=True)
    hora_fin = models.TimeField(blank=True, null=True)
    costo = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    ubicacion = models.CharField(max_length=200, blank=True, null=True)
    orden = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.titulo} - {self.plan_id.titulo}"

    class Meta:
        db_table = 'actividad_plan'
        ordering = ['fecha_actividad', 'orden']

