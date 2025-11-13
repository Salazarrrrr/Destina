from django.urls import path
from .views import (
    # Auth
    SignupView, LoginView, LogoutView, ProfileView,
    # Destinations
    DestinationListView, DestinationDetailView, SaveFavoriteDestinationView,
    # Categories
    CategoryListView,
    # Listings
    ListingListView, ListingDetailView, CreateListingView, UpdateListingView,
    # Images
    ListingImagesView, UploadImageView,
    # Bookings
    CreateBookingView, BookingHistoryView, BookingDetailView, CancelBookingView,
    # Chat
    SendChatMessageView, ChatHistoryView,
    # Search & Recommendations
    SearchListingsView, PopularSearchesView, FilterResultsView
)

urlpatterns = [
    # Authentication & Accounts
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    
    # Destinations
    path('destinations/', DestinationListView.as_view(), name='destination-list'),
    path('destinations/<int:destination_id>/', DestinationDetailView.as_view(), name='destination-detail'),
    path('destinations/<int:destination_id>/favorite/', SaveFavoriteDestinationView.as_view(), name='save-favorite'),
    
    # Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),
    
    # Listings
    path('listings/', ListingListView.as_view(), name='listing-list'),
    path('listings/<int:listing_id>/', ListingDetailView.as_view(), name='listing-detail'),
    path('listings/create/', CreateListingView.as_view(), name='create-listing'),
    path('listings/<int:listing_id>/update/', UpdateListingView.as_view(), name='update-listing'),
    
    # Images
    path('listings/<int:listing_id>/images/', ListingImagesView.as_view(), name='listing-images'),
    path('listings/<int:listing_id>/images/upload/', UploadImageView.as_view(), name='upload-image'),
    
    # Bookings
    path('bookings/create/', CreateBookingView.as_view(), name='create-booking'),
    path('bookings/history/', BookingHistoryView.as_view(), name='booking-history'),
    path('bookings/<int:booking_id>/', BookingDetailView.as_view(), name='booking-detail'),
    path('bookings/<int:booking_id>/cancel/', CancelBookingView.as_view(), name='cancel-booking'),
    
    # Chat
    path('chat/send/', SendChatMessageView.as_view(), name='send-message'),
    path('chat/<str:session_id>/', ChatHistoryView.as_view(), name='chat-history'),
    
    # Search & Recommendations
    path('search/', SearchListingsView.as_view(), name='search-listings'),
    path('popular-searches/', PopularSearchesView.as_view(), name='popular-searches'),
    path('filter/', FilterResultsView.as_view(), name='filter-results'),
]