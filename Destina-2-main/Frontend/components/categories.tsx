"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, TreePine, Waves, Mountain, Castle } from "lucide-react"
import { useAiSuggestions } from "@/context/AiSuggestionsContext"
import { getDestinationsByCategory, type DestinationInfo, featuredFallback } from "@/lib/destinationCatalog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const categories = [
  {
    key: "casas-completas",
    icon: Home,
    title: "Casas completas",
    description: "Espacios privados para ti solo",
  },
  {
    key: "apartamentos",
    icon: Building,
    title: "Apartamentos",
    description: "Cómodos y bien ubicados",
  },
  {
    key: "cabanas",
    icon: TreePine,
    title: "Cabañas",
    description: "Escápate a la naturaleza",
  },
  {
    key: "frente-al-mar",
    icon: Waves,
    title: "Frente al mar",
    description: "Vistas increíbles al océano",
  },
  {
    key: "montana",
    icon: Mountain,
    title: "Montaña",
    description: "Aire puro y tranquilidad",
  },
  {
    key: "unicos",
    icon: Castle,
    title: "Únicos",
    description: "Lugares extraordinarios",
  },
]

export function Categories({ id }: { id?: string }) {
  const { setDestinations, destinations } = useAiSuggestions()
  const [open, setOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalItems, setModalItems] = useState<DestinationInfo[]>([])

  const openCategoryModal = (categoryKey: string, title: string) => {
    // IDs a excluir: lo que ya está mostrado por la sección de alojamientos + primeros del fallback
    const currentIds = (destinations || []).map((d) => d.id)
    const fallbackIds = featuredFallback().slice(0, 8).map((d) => d.id)
    const exclude = Array.from(new Set([...currentIds, ...fallbackIds]))

    // Intento 1: destinos nuevos (excluyendo repetidos)
    let matches = getDestinationsByCategory(categoryKey, 10, exclude)

    // Si quedó vacío por exclusión agresiva, haz fallback para que se vean tarjetas
    if (matches.length === 0) {
      matches = getDestinationsByCategory(categoryKey, 10)
    }

    setModalItems(matches)
    setModalTitle(title)
    setOpen(true)
  }

  // Al hacer clic en un destino dentro del modal, actualizamos la sección de Alojamientos y hacemos scroll
  const handlePickDestinationList = (items: DestinationInfo[]) => {
    setDestinations(items)
    const target = document.getElementById("section-alojamientos")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setOpen(false)
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora por categoría</h2>
          <p className="text-lg text-gray-600">Encuentra el tipo de alojamiento perfecto para tu viaje</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => openCategoryModal(category.key, category.title)}
                className="text-left"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
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
              </button>
            )
          })}
        </div>
      </div>

      {/* Modal de destinos de la categoría */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>

        {/* Agrega altura máxima y overflow para permitir scroll */}
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
            <DialogTitle className="p-4">Destinos de {modalTitle}</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modalItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="text-left"
                  onClick={() => handlePickDestinationList(modalItems)}
                  title="Ver estos destinos en Alojamientos"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 space-y-1">
                      <h5 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h5>
                      <p className="text-xs text-gray-600 line-clamp-2">{item.summary}</p>
                      {item.priceRange && (
                        <p className="text-xs font-medium text-rose-500">{item.priceRange}</p>
                      )}
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => handlePickDestinationList(modalItems)}
                className="text-sm text-rose-600 hover:underline"
              >
                Ver estos destinos en Alojamientos
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
