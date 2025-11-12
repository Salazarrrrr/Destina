"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User, Globe, Heart, Calendar, Settings, HelpCircle, LogOut, UserPlus, LogIn, Home } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

/**
 * Header principal de la aplicación.
 * Contiene el logo, navegación y el menú de usuario.
 * - Muestra enlaces de navegación
 * - Contiene un Dropdown para acciones de usuario
 * - Abre el modal de autenticación cuando corresponde
 */
export function Header() {
  // Control del modal de autenticación y modo (login/register).
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // Estado simulado de autenticación. En la app real esto vendría del contexto o store.
  const isLoggedIn = false // TODO: reemplazar por contexto/auth real

  /**
   * Abre el modal de autenticación en el modo especificado.
   * @param mode "login" | "register"
   */
  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const scrollToSection = (sectionId: string) => {
    if (typeof window === "undefined") return
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-rose-500 rounded-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-rose-500">Destina</div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                type="button"
                onClick={() => scrollToSection("section-alojamientos")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Alojamientos
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("section-experiencias")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Experiencias
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("section-ayuda")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Ayuda
              </button>
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:flex text-gray-700 hover:text-gray-900">
                Pon tu casa en Destina
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                <Globe className="h-4 w-4" />
              </Button>

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent border-gray-300 hover:shadow-md transition-shadow"
                  >
                    <Menu className="h-4 w-4" />
                    {isLoggedIn ? (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  {isLoggedIn ? (
                    <>
                      {/* Usuario logueado */}
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">Juan Pérez</p>
                        <p className="text-xs text-gray-500">juan@ejemplo.com</p>
                      </div>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Mi perfil
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        Mis reservas
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Mis favoritos
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Mis propiedades
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Centro de ayuda
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      {/* Usuario no logueado */}
                      <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => openAuthModal("login")}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar sesión
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer" onClick={() => openAuthModal("register")}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Registrarse
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Pon tu casa en Destina
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Centro de ayuda
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
