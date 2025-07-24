import { Button } from "@/components/ui/button"
import { Menu, User, Globe } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-rose-500">Destina</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Alojamientos
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Experiencias
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Ayuda
            </a>
          </nav>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              Pon tu casa en Destina
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Menu className="h-4 w-4" />
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
