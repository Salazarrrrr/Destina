from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import AtraccionDestino, GaleriaDestino, ClimaDestino
from .serializers import AtraccionDestinoSerializer, GaleriaDestinoSerializer, ClimaDestinoSerializer
from Tablas.models import Destination


class AtraccionDestinoListView(APIView):
    """Listar atracciones de un destino"""
    permission_classes = [AllowAny]
    
    def get(self, request, destino_id):
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            atracciones = AtraccionDestino.objects.filter(destino_id=destino, is_active=True)
            categoria = request.query_params.get('categoria')
            
            if categoria:
                atracciones = atracciones.filter(categoria=categoria)
            
            serializer = AtraccionDestinoSerializer(atracciones, many=True)
            return Response(serializer.data)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def post(self, request, destino_id):
        """Crear nueva atracción (solo admin)"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'error': 'Admin only'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            atraccion = AtraccionDestino.objects.create(
                destino_id=destino,
                nombre=request.data['nombre'],
                descripcion=request.data['descripcion'],
                categoria=request.data['categoria'],
                latitud=request.data.get('latitud', None),
                longitud=request.data.get('longitud', None),
                imagen_url=request.data.get('imagen_url', ''),
                precio_entrada=request.data.get('precio_entrada', None),
                horario_apertura=request.data.get('horario_apertura', None),
                horario_cierre=request.data.get('horario_cierre', None),
                rating_promedio=request.data.get('rating_promedio', 0.0)
            )
            return Response(AtraccionDestinoSerializer(atraccion).data, status=HTTP_201_CREATED)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class AtraccionDestinoDetailView(APIView):
    """Detalle de una atracción"""
    permission_classes = [AllowAny]
    
    def get(self, request, atraccion_id):
        try:
            atraccion = AtraccionDestino.objects.get(atraccion_id=atraccion_id, is_active=True)
            serializer = AtraccionDestinoSerializer(atraccion)
            return Response(serializer.data)
        except AtraccionDestino.DoesNotExist:
            return Response({'error': 'Atracción no encontrada'}, status=HTTP_404_NOT_FOUND)


class GaleriaDestinoView(APIView):
    """Gestionar galería de imágenes de un destino"""
    permission_classes = [AllowAny]
    
    def get(self, request, destino_id):
        """Obtener galería de un destino"""
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            galeria = GaleriaDestino.objects.filter(destino_id=destino)
            serializer = GaleriaDestinoSerializer(galeria, many=True)
            return Response(serializer.data)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def post(self, request, destino_id):
        """Agregar imagen a la galería (solo admin)"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'error': 'Admin only'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            imagen = GaleriaDestino.objects.create(
                destino_id=destino,
                imagen_url=request.data['imagen_url'],
                descripcion=request.data.get('descripcion', ''),
                is_principal=request.data.get('is_principal', False),
                orden=request.data.get('orden', 0)
            )
            return Response(GaleriaDestinoSerializer(imagen).data, status=HTTP_201_CREATED)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class ClimaDestinoView(APIView):
    """Gestionar información climática de un destino"""
    permission_classes = [AllowAny]
    
    def get(self, request, destino_id):
        """Obtener información climática de un destino"""
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            mes = request.query_params.get('mes')
            
            clima = ClimaDestino.objects.filter(destino_id=destino)
            if mes:
                clima = clima.filter(mes=mes)
            
            serializer = ClimaDestinoSerializer(clima, many=True)
            return Response(serializer.data)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def post(self, request, destino_id):
        """Agregar información climática (solo admin)"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'error': 'Admin only'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            destino = Destination.objects.get(destination_id=destino_id)
            clima, created = ClimaDestino.objects.get_or_create(
                destino_id=destino,
                mes=request.data['mes'],
                defaults={
                    'temperatura_promedio': request.data['temperatura_promedio'],
                    'temperatura_min': request.data['temperatura_min'],
                    'temperatura_max': request.data['temperatura_max'],
                    'dias_lluvia': request.data.get('dias_lluvia', 0),
                    'descripcion': request.data.get('descripcion', '')
                }
            )
            
            if not created:
                clima.temperatura_promedio = request.data.get('temperatura_promedio', clima.temperatura_promedio)
                clima.temperatura_min = request.data.get('temperatura_min', clima.temperatura_min)
                clima.temperatura_max = request.data.get('temperatura_max', clima.temperatura_max)
                clima.dias_lluvia = request.data.get('dias_lluvia', clima.dias_lluvia)
                clima.descripcion = request.data.get('descripcion', clima.descripcion)
                clima.save()
            
            return Response(ClimaDestinoSerializer(clima).data, status=HTTP_201_CREATED)
        except Destination.DoesNotExist:
            return Response({'error': 'Destino no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

