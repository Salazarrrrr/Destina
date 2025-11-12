from django.db import models
from django.core.validators import RegexValidator

# Perfil de Usuario Model
class PerfilUsuario(models.Model):
    perfil_id = models.AutoField(primary_key=True)
    user_id = models.OneToOneField('Tablas.User', on_delete=models.CASCADE, related_name='perfil')
    telefono = models.CharField(max_length=20, blank=True, null=True, validators=[
        RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato de teléfono inválido")
    ])
    fecha_nacimiento = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    avatar_url = models.CharField(max_length=500, blank=True, null=True)
    pais = models.CharField(max_length=100, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    preferencias_viaje = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Perfil de {self.user_id.name}"

    class Meta:
        db_table = 'perfil_usuario'


# Seguimiento de Usuarios Model
class SeguimientoUsuario(models.Model):
    seguimiento_id = models.AutoField(primary_key=True)
    seguidor_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='siguiendo')
    seguido_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='seguidores')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.seguidor_id.name} sigue a {self.seguido_id.name}"

    class Meta:
        db_table = 'seguimiento_usuario'
        unique_together = ['seguidor_id', 'seguido_id']


# Reseña de Usuario Model
class ResenaUsuario(models.Model):
    resena_id = models.AutoField(primary_key=True)
    usuario_resenado_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='resenas_recibidas')
    usuario_resenador_id = models.ForeignKey('Tablas.User', on_delete=models.CASCADE, related_name='resenas_hechas')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comentario = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reseña de {self.usuario_resenador_id.name} para {self.usuario_resenado_id.name}"

    class Meta:
        db_table = 'resena_usuario'
        unique_together = ['usuario_resenado_id', 'usuario_resenador_id']

