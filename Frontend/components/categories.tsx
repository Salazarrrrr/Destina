import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, TreePine, Waves, Mountain, Castle } from "lucide-react"

const categories = [
  {
    icon: Home,
    title: "Casas completas",
    description: "Espacios privados para ti solo",
  },
  {
    icon: Building,
    title: "Apartamentos",
    description: "Cómodos y bien ubicados",
  },
  {
    icon: TreePine,
    title: "Cabañas",
    description: "Escápate a la naturaleza",
  },
  {
    icon: Waves,
    title: "Frente al mar",
    description: "Vistas increíbles al océano",
  },
  {
    icon: Mountain,
    title: "Montaña",
    description: "Aire puro y tranquilidad",
  },
  {
    icon: Castle,
    title: "Únicos",
    description: "Lugares extraordinarios",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora por categoría</h2>
          <p className="text-lg text-gray-600">Encuentra el tipo de alojamiento perfecto para tu viaje</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-rose-50 rounded-full group-hover:bg-rose-100 transition-colors">
                      <Icon className="h-6 w-6 text-rose-500" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
