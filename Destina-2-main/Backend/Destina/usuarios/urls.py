from django.urls import path
from .views import (
    PerfilUsuarioView,
    SeguirUsuarioView,
    SeguidoresView,
    SiguiendoView,
    ResenaUsuarioView
)

urlpatterns = [
    path('perfil/', PerfilUsuarioView.as_view(), name='perfil-usuario'),
    path('perfil/<int:user_id>/', PerfilUsuarioView.as_view(), name='perfil-usuario-detail'),
    path('<int:user_id>/seguir/', SeguirUsuarioView.as_view(), name='seguir-usuario'),
    path('<int:user_id>/seguidores/', SeguidoresView.as_view(), name='seguidores'),
    path('<int:user_id>/siguiendo/', SiguiendoView.as_view(), name='siguiendo'),
    path('<int:user_id>/resenas/', ResenaUsuarioView.as_view(), name='resenas-usuario'),
]

