from rest_framework import serializers
from .models import User, Destination, Category, Listing, Booking, ChatMessage, Image, PopularSearch


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'email', 'name', 'created_at', 'role']
        read_only_fields = ['user_id', 'created_at']


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['destination_id', 'name', 'country', 'description', 'slug']
        read_only_fields = ['destination_id']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'name', 'icon_name', 'description']
        read_only_fields = ['category_id']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image_id', 'listing_id', 'url', 'is_main']
        read_only_fields = ['image_id']


class ListingSerializer(serializers.ModelSerializer):
    host_id = UserSerializer(read_only=True)
    destination_id = DestinationSerializer(read_only=True)
    category_id = CategorySerializer(read_only=True)
    images = ImageSerializer(source='images', many=True, read_only=True)
    
    class Meta:
        model = Listing
        fields = [
            'listing_id', 'host_id', 'destination_id', 'category_id',
            'title', 'description', 'price_per_night', 'rating_avg',
            'created_at', 'is_active', 'images'
        ]
        read_only_fields = ['listing_id', 'created_at', 'rating_avg']


class BookingSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    listing_id = ListingSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'booking_id', 'listing_id', 'user_id', 'start_date',
            'end_date', 'total_price', 'status', 'created_at'
        ]
        read_only_fields = ['booking_id', 'created_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = [
            'message_id', 'user_id', 'session_id', 'sender',
            'message_text', 'timestamp'
        ]
        read_only_fields = ['message_id', 'timestamp']


class PopularSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularSearch
        fields = ['search_id', 'search_text', 'times_used']
        read_only_fields = ['search_id']