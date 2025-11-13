from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import Recomendacion, RecomendacionUsuario
from .serializers import RecomendacionSerializer, RecomendacionUsuarioSerializer


class RecomendacionListView(APIView):
    """Listar todas las recomendaciones"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        recomendaciones = Recomendacion.objects.filter(is_active=True)
        tipo = request.query_params.get('tipo')
        ubicacion = request.query_params.get('ubicacion')
        
        if tipo:
            recomendaciones = recomendaciones.filter(tipo=tipo)
        if ubicacion:
            recomendaciones = recomendaciones.filter(ubicacion__icontains=ubicacion)
        
        serializer = RecomendacionSerializer(recomendaciones, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """Crear nueva recomendación (solo admin)"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response({'error': 'Admin only'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            recomendacion = Recomendacion.objects.create(
                titulo=request.data['titulo'],
                descripcion=request.data['descripcion'],
                tipo=request.data['tipo'],
                ubicacion=request.data['ubicacion'],
                rating=request.data.get('rating', 0.0),
                imagen_url=request.data.get('imagen_url', ''),
                precio_estimado=request.data.get('precio_estimado', None)
            )
            return Response(RecomendacionSerializer(recomendacion).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class RecomendacionDetailView(APIView):
    """Detalle de una recomendación"""
    permission_classes = [AllowAny]
    
    def get(self, request, recomendacion_id):
        try:
            recomendacion = Recomendacion.objects.get(recomendacion_id=recomendacion_id, is_active=True)
            serializer = RecomendacionSerializer(recomendacion)
            return Response(serializer.data)
        except Recomendacion.DoesNotExist:
            return Response({'error': 'Recomendación no encontrada'}, status=HTTP_404_NOT_FOUND)


class GuardarRecomendacionView(APIView):
    """Guardar recomendación para un usuario"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, recomendacion_id):
        try:
            recomendacion = Recomendacion.objects.get(recomendacion_id=recomendacion_id)
            recomendacion_usuario, created = RecomendacionUsuario.objects.get_or_create(
                user_id=request.user,
                recomendacion_id=recomendacion,
                defaults={'nota_personal': request.data.get('nota_personal', '')}
            )
            
            if not created:
                recomendacion_usuario.nota_personal = request.data.get('nota_personal', recomendacion_usuario.nota_personal)
                recomendacion_usuario.save()
            
            return Response(RecomendacionUsuarioSerializer(recomendacion_usuario).data, status=HTTP_201_CREATED)
        except Recomendacion.DoesNotExist:
            return Response({'error': 'Recomendación no encontrada'}, status=HTTP_404_NOT_FOUND)


class MisRecomendacionesView(APIView):
    """Obtener recomendaciones guardadas del usuario"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        recomendaciones = RecomendacionUsuario.objects.filter(user_id=request.user)
        serializer = RecomendacionUsuarioSerializer(recomendaciones, many=True)
        return Response(serializer.data)

