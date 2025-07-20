import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const properties = [
  {
    id: 1,
    title: "Villa moderna con vista al mar",
    location: "Cancún, México",
    price: 150,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400",
    badge: "Superhost",
  },
  {
    id: 2,
    title: "Cabaña acogedora en la montaña",
    location: "Bariloche, Argentina",
    price: 85,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    badge: "Favorito",
  },
  {
    id: 3,
    title: "Apartamento céntrico y moderno",
    location: "Barcelona, España",
    price: 120,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    badge: "Nuevo",
  },
  {
    id: 4,
    title: "Casa colonial con jardín",
    location: "Cartagena, Colombia",
    price: 95,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    badge: "Superhost",
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Alojamientos destacados</h2>
          <p className="text-lg text-gray-600">Descubre los lugares más populares y mejor valorados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Badge className="absolute top-3 left-3 bg-white text-gray-900">{property.badge}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-gray-500">({property.reviews})</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{property.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">${property.price}</span>
                    <span className="text-sm text-gray-600"> / noche</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver más alojamientos
          </Button>
        </div>
      </div>
    </section>
  )
}
