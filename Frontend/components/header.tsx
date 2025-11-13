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
import { Menu, User, Globe, HelpCircle, UserPlus, LogIn, Home } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { ListingModal } from "@/components/listing-modal"

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isListingModalOpen, setIsListingModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const isLoggedIn = false // Esto vendría de tu estado de autenticación

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
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
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Alojamientos
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Experiencias
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Ayuda
              </a>
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="hidden md:flex text-gray-700 hover:text-gray-900"
                onClick={() => setIsListingModalOpen(true)}
              >
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
                    <></>
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

                      <DropdownMenuItem className="cursor-pointer" onClick={() => setIsListingModalOpen(true)}>
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

      <ListingModal isOpen={isListingModalOpen} onClose={() => setIsListingModalOpen(false)} />
    </>
  )
}
