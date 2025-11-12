from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Atracción del Destino Model
class AtraccionDestino(models.Model):
    CATEGORIA_CHOICES = [
        ('monumento', 'Monumento'),
        ('museo', 'Museo'),
        ('naturaleza', 'Naturaleza'),
        ('playa', 'Playa'),
        ('gastronomia', 'Gastronomía'),
        ('entretenimiento', 'Entretenimiento'),
        ('cultura', 'Cultura'),
        ('deporte', 'Deporte'),
    ]
    
    atraccion_id = models.AutoField(primary_key=True)
    destino_id = models.ForeignKey('Tablas.Destination', on_delete=models.CASCADE, related_name='atracciones')
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    latitud = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitud = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    imagen_url = models.CharField(max_length=500, blank=True, null=True)
    precio_entrada = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    horario_apertura = models.TimeField(blank=True, null=True)
    horario_cierre = models.TimeField(blank=True, null=True)
    rating_promedio = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.destino_id.name}"

    class Meta:
        db_table = 'atraccion_destino'
        verbose_name_plural = 'atracciones_destino'


# Galería de Imágenes del Destino Model
class GaleriaDestino(models.Model):
    galeria_id = models.AutoField(primary_key=True)
    destino_id = models.ForeignKey('Tablas.Destination', on_delete=models.CASCADE, related_name='galeria')
    imagen_url = models.CharField(max_length=500)
    descripcion = models.CharField(max_length=300, blank=True, null=True)
    is_principal = models.BooleanField(default=False)
    orden = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Imagen {self.galeria_id} - {self.destino_id.name}"

    class Meta:
        db_table = 'galeria_destino'
        ordering = ['is_principal', 'orden']


# Información del Clima del Destino Model
class ClimaDestino(models.Model):
    MES_CHOICES = [
        (1, 'Enero'), (2, 'Febrero'), (3, 'Marzo'), (4, 'Abril'),
        (5, 'Mayo'), (6, 'Junio'), (7, 'Julio'), (8, 'Agosto'),
        (9, 'Septiembre'), (10, 'Octubre'), (11, 'Noviembre'), (12, 'Diciembre'),
    ]
    
    clima_id = models.AutoField(primary_key=True)
    destino_id = models.ForeignKey('Tablas.Destination', on_delete=models.CASCADE, related_name='clima')
    mes = models.IntegerField(choices=MES_CHOICES)
    temperatura_promedio = models.DecimalField(max_digits=5, decimal_places=2)
    temperatura_min = models.DecimalField(max_digits=5, decimal_places=2)
    temperatura_max = models.DecimalField(max_digits=5, decimal_places=2)
    dias_lluvia = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(31)])
    descripcion = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Clima {self.get_mes_display()} - {self.destino_id.name}"

    class Meta:
        db_table = 'clima_destino'
        unique_together = ['destino_id', 'mes']
        ordering = ['mes']

