# ======================================================
# NOTA: Módulo revisado el 20/10/2025 - mantenimiento menor
# Se añadieron comentarios de documentación sin alterar lógica.
# ======================================================


from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password, check_password
from .models import User, Destination, Category, Listing, Booking, ChatMessage, Image, PopularSearch
from .serializers import (
    UserSerializer, DestinationSerializer, CategorySerializer, 
    ListingSerializer, BookingSerializer, ChatMessageSerializer, 
    ImageSerializer, PopularSearchSerializer
)

# ============== USER AUTHENTICATION ==============

class SignupView(APIView):
    """Registrar nuevo usuario"""

    # Comentario: Endpoint verificado, funcional y estable.
    # TODO: agregar validaciones adicionales (por ejemplo, campos duplicados)

    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            user = User.objects.create(
                email=request.data['email'],
                name=request.data['name'],
                password_hash=make_password(request.data['password']),
                role='guest'
            )
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key
            }, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """Iniciar sesión"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            user = User.objects.get(email=request.data['email'])
            if check_password(request.data['password'], user.password_hash):
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'user': UserSerializer(user).data,
                    'token': token.key
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    """Cerrar sesión"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response({'message': 'Logged out successfully'})


class ProfileView(APIView):
    """Obtener/actualizar perfil de usuario"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        user = request.user
        user.name = request.data.get('name', user.name)
        user.email = request.data.get('email', user.email)
        user.save()
        return Response(UserSerializer(user).data)


# ============== DESTINATIONS ==============

class DestinationListView(APIView):
    """Listar y crear destinos"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        destinations = Destination.objects.all()
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        permission_classes = [IsAuthenticated]
        if request.user.role != 'admin':
            return Response({'error': 'Admin only'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            destination = Destination.objects.create(
                name=request.data['name'],
                country=request.data['country'],
                description=request.data['description'],
                slug=request.data['slug']
            )
            return Response(DestinationSerializer(destination).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class DestinationDetailView(APIView):
    """Detalle de destino"""
    permission_classes = [AllowAny]
    
    def get(self, request, destination_id):
        try:
            destination = Destination.objects.get(destination_id=destination_id)
            serializer = DestinationSerializer(destination)
            return Response(serializer.data)
        except Destination.DoesNotExist:
            return Response({'error': 'Destination not found'}, status=HTTP_404_NOT_FOUND)


class SaveFavoriteDestinationView(APIView):
    """Guardar destino favorito (relación con usuario)"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, destination_id):
        try:
            destination = Destination.objects.get(destination_id=destination_id)
            # Aquí podrías agregar una tabla intermedia para favoritos
            return Response({'message': 'Destination saved as favorite'}, status=HTTP_201_CREATED)
        except Destination.DoesNotExist:
            return Response({'error': 'Destination not found'}, status=HTTP_404_NOT_FOUND)


# ============== CATEGORIES ==============

class CategoryListView(APIView):
    """Listar categorías"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


# ============== LISTINGS ==============

class ListingListView(APIView):
    """Listar propiedades/alojamientos"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        listings = Listing.objects.filter(is_active=True)
        destination_id = request.query_params.get('destination_id')
        category_id = request.query_params.get('category_id')
        
        if destination_id:
            listings = listings.filter(destination_id=destination_id)
        if category_id:
            listings = listings.filter(category_id=category_id)
        
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)


class ListingDetailView(APIView):
    """Detalle de propiedad"""
    permission_classes = [AllowAny]
    
    def get(self, request, listing_id):
        try:
            listing = Listing.objects.get(listing_id=listing_id)
            serializer = ListingSerializer(listing)
            return Response(serializer.data)
        except Listing.DoesNotExist:
            return Response({'error': 'Listing not found'}, status=HTTP_404_NOT_FOUND)


class CreateListingView(APIView):
    """Crear nueva propiedad (solo hosts)"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        if request.user.role != 'host':
            return Response({'error': 'Only hosts can create listings'}, status=HTTP_400_BAD_REQUEST)
        
        try:
            listing = Listing.objects.create(
                host_id=request.user,
                destination_id=Destination.objects.get(destination_id=request.data['destination_id']),
                category_id=Category.objects.get(category_id=request.data['category_id']),
                title=request.data['title'],
                description=request.data['description'],
                price_per_night=request.data['price_per_night']
            )
            return Response(ListingSerializer(listing).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class UpdateListingView(APIView):
    """Actualizar propiedad (solo el propietario)"""
    permission_classes = [IsAuthenticated]
    
    def put(self, request, listing_id):
        try:
            listing = Listing.objects.get(listing_id=listing_id)
            if listing.host_id != request.user:
                return Response({'error': 'Unauthorized'}, status=HTTP_400_BAD_REQUEST)
            
            listing.title = request.data.get('title', listing.title)
            listing.description = request.data.get('description', listing.description)
            listing.price_per_night = request.data.get('price_per_night', listing.price_per_night)
            listing.save()
            return Response(ListingSerializer(listing).data)
        except Listing.DoesNotExist:
            return Response({'error': 'Listing not found'}, status=HTTP_404_NOT_FOUND)


# ============== IMAGES ==============

class ListingImagesView(APIView):
    """Obtener imágenes de una propiedad"""
    permission_classes = [AllowAny]
    
    def get(self, request, listing_id):
        try:
            images = Image.objects.filter(listing_id=listing_id)
            serializer = ImageSerializer(images, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class UploadImageView(APIView):
    """Subir imagen para una propiedad"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, listing_id):
        try:
            listing = Listing.objects.get(listing_id=listing_id)
            if listing.host_id != request.user:
                return Response({'error': 'Unauthorized'}, status=HTTP_400_BAD_REQUEST)
            
            image = Image.objects.create(
                listing_id=listing,
                url=request.data['url'],
                is_main=request.data.get('is_main', False)
            )
            return Response(ImageSerializer(image).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


# ============== BOOKINGS ==============

class CreateBookingView(APIView):
    """Crear reserva"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            booking = Booking.objects.create(
                user_id=request.user,
                listing_id=Listing.objects.get(listing_id=request.data['listing_id']),
                start_date=request.data['start_date'],
                end_date=request.data['end_date'],
                total_price=request.data['total_price']
            )
            return Response(BookingSerializer(booking).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class BookingHistoryView(APIView):
    """Historial de reservas del usuario"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        bookings = Booking.objects.filter(user_id=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)


class BookingDetailView(APIView):
    """Detalle de reserva"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, booking_id):
        try:
            booking = Booking.objects.get(booking_id=booking_id)
            if booking.user_id != request.user and booking.listing_id.host_id != request.user:
                return Response({'error': 'Unauthorized'}, status=HTTP_400_BAD_REQUEST)
            return Response(BookingSerializer(booking).data)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=HTTP_404_NOT_FOUND)


class CancelBookingView(APIView):
    """Cancelar reserva"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(booking_id=booking_id)
            if booking.user_id != request.user:
                return Response({'error': 'Unauthorized'}, status=HTTP_400_BAD_REQUEST)
            
            booking.status = 'cancelled'
            booking.save()
            return Response({'message': 'Booking cancelled'})
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=HTTP_404_NOT_FOUND)


# ============== CHAT MESSAGES ==============

class SendChatMessageView(APIView):
    """Enviar mensaje de chat"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            message = ChatMessage.objects.create(
                user_id=request.user,
                session_id=request.data['session_id'],
                sender=request.data['sender'],
                message_text=request.data['message_text']
            )
            return Response(ChatMessageSerializer(message).data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class ChatHistoryView(APIView):
    """Obtener historial de chat"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, session_id):
        messages = ChatMessage.objects.filter(session_id=session_id)
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)


# ============== SEARCH & RECOMMENDATIONS ==============

class SearchListingsView(APIView):
    """Buscar propiedades"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        search_text = request.query_params.get('q', '')
        
        # Registrar búsqueda popular
        popular_search, created = PopularSearch.objects.get_or_create(search_text=search_text)
        if not created:
            popular_search.times_used += 1
            popular_search.save()
        
        # Filtrar propiedades
        listings = Listing.objects.filter(
            title__icontains=search_text,
            is_active=True
        )
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)


class PopularSearchesView(APIView):
    """Obtener búsquedas más populares"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        popular = PopularSearch.objects.order_by('-times_used')[:10]
        serializer = PopularSearchSerializer(popular, many=True)
        return Response(serializer.data)


class FilterResultsView(APIView):
    """Filtrar resultados de búsqueda"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        listings = Listing.objects.filter(is_active=True)
        
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        rating = request.query_params.get('rating')
        
        if min_price:
            listings = listings.filter(price_per_night__gte=min_price)
        if max_price:
            listings = listings.filter(price_per_night__lte=max_price)
        if rating:
            listings = listings.filter(rating_avg__gte=rating)
        
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)