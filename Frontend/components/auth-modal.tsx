"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, Eye, EyeOff, Apple, Mail, Lock, User, Phone, Home, ArrowLeft } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
    })
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const switchMode = (newMode: "login" | "register" | "forgot") => {
    setMode(newMode)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <CardHeader className="relative text-center pb-4 pt-6 bg-gradient-to-b from-white to-gray-50/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 hover:bg-gray-100/50 rounded-full transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </Button>

          {mode === "forgot" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => switchMode("login")}
              className="absolute left-4 top-4 hover:bg-gray-100/50 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Destina
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {mode === "login" && "Bienvenido de vuelta"}
              {mode === "register" && "Crear cuenta"}
              {mode === "forgot" && "Recuperar contraseña"}
            </h2>
            <p className="text-sm text-gray-600">
              {mode === "login" && "Inicia sesión para continuar"}
              {mode === "register" && "Únete a la comunidad de viajeros"}
              {mode === "forgot" && "Te enviaremos un enlace de recuperación"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Social Login Buttons */}
            {mode !== "forgot" && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 bg-black hover:bg-gray-800 text-white border-0 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  <Apple className="h-5 w-5 mr-3" />
                  Continuar con Apple
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar con Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-gray-500 font-medium">o</span>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Nombre
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                        placeholder="Juan"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Apellido
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                        placeholder="Pérez"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                    placeholder="tu@ejemplo.com"
                    required
                  />
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Teléfono (opcional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>
              )}

              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10 h-11 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            {mode === "login" && (
              <div className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => switchMode("forgot")}
                  className="text-sm text-rose-500 hover:text-rose-600 p-0 h-auto font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
            )}

            {/* Terms for Register */}
            {mode === "register" && (
              <div className="text-xs text-gray-500 leading-relaxed">
                Al crear una cuenta, aceptas nuestros{" "}
                <button type="button" className="text-rose-500 hover:text-rose-600 underline">
                  Términos de Servicio
                </button>{" "}
                y{" "}
                <button type="button" className="text-rose-500 hover:text-rose-600 underline">
                  Política de Privacidad
                </button>
                .
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>
                    {mode === "login" && "Iniciando sesión..."}
                    {mode === "register" && "Creando cuenta..."}
                    {mode === "forgot" && "Enviando enlace..."}
                  </span>
                </div>
              ) : (
                <>
                  {mode === "login" && "Iniciar sesión"}
                  {mode === "register" && "Crear cuenta"}
                  {mode === "forgot" && "Enviar enlace"}
                </>
              )}
            </Button>

            {/* Switch Mode */}
            {mode !== "forgot" && (
              <div className="text-center text-sm text-gray-600">
                {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => switchMode(mode === "login" ? "register" : "login")}
                  className="text-rose-500 hover:text-rose-600 p-0 h-auto font-semibold"
                >
                  {mode === "login" ? "Regístrate" : "Inicia sesión"}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
