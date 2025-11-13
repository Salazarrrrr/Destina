from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Recomendación Model
class Recomendacion(models.Model):
    TIPO_CHOICES = [
        ('destino', 'Destino'),
        ('actividad', 'Actividad'),
        ('restaurante', 'Restaurante'),
        ('alojamiento', 'Alojamiento'),
    ]
    
    recomendacion_id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    imagen_url = models.CharField(max_length=500, blank=True, null=True)
    ubicacion = models.CharField(max_length=200)
    precio_estimado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.titulo} ({self.tipo})"

    class Meta:
        db_table = 'recomendacion'
        verbose_name_plural = 'recomendaciones'


# Recomendación de Usuario Model
class RecomendacionUsuario(models.Model):
    recomendacion_usuario_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='recomendaciones_usuario')
    recomendacion_id = models.ForeignKey(Recomendacion, on_delete=models.CASCADE, related_name='usuarios')
    fecha_guardada = models.DateTimeField(auto_now_add=True)
    nota_personal = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Recomendación {self.recomendacion_id.titulo} para {self.user_id.name}"

    class Meta:
        db_table = 'recomendacion_usuario'
        unique_together = ['user_id', 'recomendacion_id']

