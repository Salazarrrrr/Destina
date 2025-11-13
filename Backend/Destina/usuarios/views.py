from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import PerfilUsuario, SeguimientoUsuario, ResenaUsuario
from .serializers import PerfilUsuarioSerializer, SeguimientoUsuarioSerializer, ResenaUsuarioSerializer
from Tablas.models import User


class PerfilUsuarioView(APIView):
    """Obtener y actualizar perfil de usuario"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id=None):
        """Obtener perfil de usuario"""
        target_user_id = user_id if user_id else request.user.user_id
        
        try:
            target_user = User.objects.get(user_id=target_user_id)
            perfil, created = PerfilUsuario.objects.get_or_create(user_id=target_user)
            serializer = PerfilUsuarioSerializer(perfil)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def put(self, request):
        """Actualizar perfil del usuario autenticado"""
        try:
            perfil, created = PerfilUsuario.objects.get_or_create(user_id=request.user)
            perfil.telefono = request.data.get('telefono', perfil.telefono)
            perfil.fecha_nacimiento = request.data.get('fecha_nacimiento', perfil.fecha_nacimiento)
            perfil.bio = request.data.get('bio', perfil.bio)
            perfil.avatar_url = request.data.get('avatar_url', perfil.avatar_url)
            perfil.pais = request.data.get('pais', perfil.pais)
            perfil.ciudad = request.data.get('ciudad', perfil.ciudad)
            perfil.preferencias_viaje = request.data.get('preferencias_viaje', perfil.preferencias_viaje)
            perfil.save()
            
            return Response(PerfilUsuarioSerializer(perfil).data)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class SeguirUsuarioView(APIView):
    """Seguir o dejar de seguir a un usuario"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id):
        """Seguir a un usuario"""
        if user_id == request.user.user_id:
            return Response({'error': 'No puedes seguirte a ti mismo'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            usuario_seguido = User.objects.get(user_id=user_id)
            seguimiento, created = SeguimientoUsuario.objects.get_or_create(
                seguidor_id=request.user,
                seguido_id=usuario_seguido
            )
            
            if not created:
                return Response({'message': 'Ya sigues a este usuario'}, status=HTTP_400_BAD_REQUEST)
            
            return Response(SeguimientoUsuarioSerializer(seguimiento).data, status=HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def delete(self, request, user_id):
        """Dejar de seguir a un usuario"""
        try:
            usuario_seguido = User.objects.get(user_id=user_id)
            seguimiento = SeguimientoUsuario.objects.get(
                seguidor_id=request.user,
                seguido_id=usuario_seguido
            )
            seguimiento.delete()
            return Response({'message': 'Dejaste de seguir a este usuario'})
        except SeguimientoUsuario.DoesNotExist:
            return Response({'error': 'No sigues a este usuario'}, status=HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)


class SeguidoresView(APIView):
    """Obtener seguidores de un usuario"""
    permission_classes = [AllowAny]
    
    def get(self, request, user_id):
        try:
            usuario = User.objects.get(user_id=user_id)
            seguidores = SeguimientoUsuario.objects.filter(seguido_id=usuario)
            serializer = SeguimientoUsuarioSerializer(seguidores, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)


class SiguiendoView(APIView):
    """Obtener usuarios que sigue un usuario"""
    permission_classes = [AllowAny]
    
    def get(self, request, user_id):
        try:
            usuario = User.objects.get(user_id=user_id)
            siguiendo = SeguimientoUsuario.objects.filter(seguidor_id=usuario)
            serializer = SeguimientoUsuarioSerializer(siguiendo, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)


class ResenaUsuarioView(APIView):
    """Crear reseña de usuario"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id):
        """Crear reseña para un usuario"""
        if user_id == request.user.user_id:
            return Response({'error': 'No puedes reseñarte a ti mismo'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            usuario_resenado = User.objects.get(user_id=user_id)
            resena, created = ResenaUsuario.objects.get_or_create(
                usuario_resenado_id=usuario_resenado,
                usuario_resenador_id=request.user,
                defaults={
                    'rating': request.data['rating'],
                    'comentario': request.data['comentario']
                }
            )
            
            if not created:
                return Response({'error': 'Ya has reseñado a este usuario'}, status=HTTP_400_BAD_REQUEST)
            
            return Response(ResenaUsuarioSerializer(resena).data, status=HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
    
    def get(self, request, user_id):
        """Obtener reseñas de un usuario"""
        try:
            usuario = User.objects.get(user_id=user_id)
            resenas = ResenaUsuario.objects.filter(usuario_resenado_id=usuario)
            serializer = ResenaUsuarioSerializer(resenas, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=HTTP_404_NOT_FOUND)

