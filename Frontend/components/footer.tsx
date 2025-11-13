import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

/**
 * Footer de la aplicación con información de la compañía, enlaces rápidos,
 * soporte y suscripción al newsletter.
 *
 * Observaciones:
 * - Los enlaces usan `href="#"` como placeholder; reemplazar por rutas reales.
 * - El input del newsletter no está conectado a ningún backend; requiere handler
 *   para enviar el email.
 */
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-rose-400">Destina</div>
            <p className="text-gray-300">
              Tu plataforma de confianza para encontrar el alojamiento perfecto en cualquier lugar del mundo.
            </p>
            <div className="flex space-x-4">
              {/* Social buttons: agregar enlaces reales si se desean */}
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Destinos populares
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog de viajes
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Términos de servicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Recibe ofertas exclusivas y consejos de viaje</p>
            <div className="space-y-2">
              <Input
                placeholder="Tu email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-rose-500 hover:bg-rose-600">Suscribirse</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Destina. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
