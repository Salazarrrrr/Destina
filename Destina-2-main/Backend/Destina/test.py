import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Destina.settings')
import django
django.setup()

from Tablas.models import Prueba

prueba = Prueba.objects.create(
    name = "Prueba 1",
    description = "Prueba 1"
)

print(prueba)
