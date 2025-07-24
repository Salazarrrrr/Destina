import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Key } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Busca y descubre",
    description: "Explora miles de alojamientos únicos en destinos increíbles alrededor del mundo",
  },
  {
    icon: Calendar,
    title: "Reserva fácilmente",
    description: "Selecciona tus fechas, confirma los detalles y realiza tu reserva de forma segura",
  },
  {
    icon: Key,
    title: "Disfruta tu estadía",
    description: "Llega a tu destino y vive una experiencia inolvidable en tu hogar temporal",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-600">Reservar tu próximo alojamiento es más fácil que nunca</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="text-center border-0 shadow-none">
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-rose-100 rounded-full">
                      <Icon className="h-8 w-8 text-rose-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
