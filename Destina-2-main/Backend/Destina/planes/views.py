from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import Plan, ActividadPlan
from .serializers import PlanSerializer, ActividadPlanSerializer
from Tablas.models import Destination


class PlanListView(APIView):
    """Listar planes de viaje"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        planes = Plan.objects.filter(is_publico=True, estado='publicado')
        destino_id = request.query_params.get('destino_id')
        user_id = request.query_params.get('user_id')
        
        if destino_id:
            planes = planes.filter(destino_id=destino_id)
        if user_id and request.user.is_authenticated:
            if int(user_id) == request.user.user_id:
                planes = Plan.objects.filter(user_id=user_id)
        
        serializer = PlanSerializer(planes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """Crear nuevo plan de viaje"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            plan = Plan.objects.create(
                user_id=request.user,
                titulo=request.data['titulo'],
                descripcion=request.data['descripcion'],
                destino_id=Destination.objects.get(destination_id=request.data['destino_id']),
                fecha_inicio=request.data['fecha_inicio'],
                fecha_fin=request.data['fecha_fin'],
                presupuesto_total=request.data.get('presupuesto_total', None),
                estado=request.data.get('estado', 'borrador'),
                is_publico=request.data.get('is_publico', False)
            )
            return Response(PlanSerializer(plan).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class PlanDetailView(APIView):
    """Detalle de un plan"""
    permission_classes = [AllowAny]
    
    def get(self, request, plan_id):
        try:
            plan = Plan.objects.get(plan_id=plan_id)
            if not plan.is_publico and plan.user_id != request.user:
                return Response({'error': 'No autorizado'}, status=HTTP_400_BAD_REQUEST)
            
            serializer = PlanSerializer(plan)
            return Response(serializer.data)
        except Plan.DoesNotExist:
            return Response({'error': 'Plan no encontrado'}, status=HTTP_404_NOT_FOUND)
    
    def put(self, request, plan_id):
        """Actualizar plan (solo el propietario)"""
        permission_classes = [IsAuthenticated]
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            plan = Plan.objects.get(plan_id=plan_id)
            if plan.user_id != request.user:
                return Response({'error': 'No autorizado'}, status=HTTP_400_BAD_REQUEST)
            
            plan.titulo = request.data.get('titulo', plan.titulo)
            plan.descripcion = request.data.get('descripcion', plan.descripcion)
            plan.fecha_inicio = request.data.get('fecha_inicio', plan.fecha_inicio)
            plan.fecha_fin = request.data.get('fecha_fin', plan.fecha_fin)
            plan.presupuesto_total = request.data.get('presupuesto_total', plan.presupuesto_total)
            plan.estado = request.data.get('estado', plan.estado)
            plan.is_publico = request.data.get('is_publico', plan.is_publico)
            plan.save()
            
            return Response(PlanSerializer(plan).data)
        except Plan.DoesNotExist:
            return Response({'error': 'Plan no encontrado'}, status=HTTP_404_NOT_FOUND)


class MisPlanesView(APIView):
    """Obtener planes del usuario autenticado"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        planes = Plan.objects.filter(user_id=request.user)
        serializer = PlanSerializer(planes, many=True)
        return Response(serializer.data)


class ActividadPlanView(APIView):
    """Gestionar actividades de un plan"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, plan_id):
        """Agregar actividad a un plan"""
        try:
            plan = Plan.objects.get(plan_id=plan_id)
            if plan.user_id != request.user:
                return Response({'error': 'No autorizado'}, status=HTTP_400_BAD_REQUEST)
            
            actividad = ActividadPlan.objects.create(
                plan_id=plan,
                titulo=request.data['titulo'],
                descripcion=request.data.get('descripcion', ''),
                fecha_actividad=request.data['fecha_actividad'],
                hora_inicio=request.data.get('hora_inicio', None),
                hora_fin=request.data.get('hora_fin', None),
                costo=request.data.get('costo', 0.0),
                ubicacion=request.data.get('ubicacion', ''),
                orden=request.data.get('orden', 0)
            )
            return Response(ActividadPlanSerializer(actividad).data, status=HTTP_201_CREATED)
        except Plan.DoesNotExist:
            return Response({'error': 'Plan no encontrado'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
    
    def get(self, request, plan_id):
        """Listar actividades de un plan"""
        try:
            plan = Plan.objects.get(plan_id=plan_id)
            if not plan.is_publico and plan.user_id != request.user:
                return Response({'error': 'No autorizado'}, status=HTTP_400_BAD_REQUEST)
            
            actividades = ActividadPlan.objects.filter(plan_id=plan)
            serializer = ActividadPlanSerializer(actividades, many=True)
            return Response(serializer.data)
        except Plan.DoesNotExist:
            return Response({'error': 'Plan no encontrado'}, status=HTTP_404_NOT_FOUND)

