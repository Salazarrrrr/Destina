from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# User Model
class User(models.Model):
    ROLE_CHOICES = [
        ('guest', 'Guest'),
        ('host', 'Host'),
        ('admin', 'Admin'),
    ]
    
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.email})"

    class Meta:
        db_table = 'user'


# Destination Model
class Destination(models.Model):
    destination_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    description = models.TextField()
    slug = models.SlugField(unique=True)

    def __str__(self):
        return f"{self.name}, {self.country}"

    class Meta:
        db_table = 'destination'


# Category Model
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    icon_name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category'
        verbose_name_plural = 'categories'


# Listing Model
class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)
    host_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    destination_id = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='listings')
    category_id = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='listings')
    title = models.CharField(max_length=200)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    rating_avg = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'listing'


# Image Model
class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    url = models.CharField(max_length=500)
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.listing_id.title}"

    class Meta:
        db_table = 'image'


# Booking Model
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    booking_id = models.AutoField(primary_key=True)
    listing_id = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='bookings')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.booking_id} - {self.user_id.name}"

    class Meta:
        db_table = 'booking'


# ChatMessage Model
class ChatMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=255)
    sender = models.CharField(max_length=100)
    message_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.message_id} from {self.sender}"

    class Meta:
        db_table = 'chatmessage'


# PopularSearch Model
class PopularSearch(models.Model):
    search_id = models.AutoField(primary_key=True)
    search_text = models.CharField(max_length=255)
    times_used = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.search_text} ({self.times_used} searches)"

    class Meta:
        db_table = 'popularsearch'