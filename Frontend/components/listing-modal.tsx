"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

interface ListingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ListingModal({ isOpen, onClose }: ListingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    capacity: "",
    type: "",
    price: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reseteamos después de 3 segundos
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        title: "",
        description: "",
        address: "",
        city: "",
        bedrooms: "",
        bathrooms: "",
        capacity: "",
        type: "",
        price: "",
      })
      onClose()
    }, 3000)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Pon tu casa en Destina</DialogTitle>
              <p className="text-sm text-gray-600 mt-2">
                Completa el formulario para listar tu propiedad. Será revisada antes de aparecer.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              {/* Información básica */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Información básica</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Nombre de la propiedad</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ej: Apartamento moderno en el centro"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe tu propiedad en detalle..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de propiedad</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="cabin">Cabaña</SelectItem>
                        <SelectItem value="studio">Estudio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidad de huéspedes</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="Ej: 4"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Ubicación</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Calle, número, apartamento"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Ej: Madrid"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Espacios */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Espacios</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Habitaciones</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      placeholder="Ej: 3"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Baños</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      placeholder="Ej: 2"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Precio */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Precio</h3>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio por noche (€)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Ej: 85"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!isFormValid || isSubmitting} className="bg-rose-500 hover:bg-rose-600">
                  {isSubmitting ? "Enviando..." : "Enviar propiedad"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Propiedad enviada!</h2>
            <p className="text-gray-600">Tu propiedad está en revisión. Te notificaremos cuando esté aprobada.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
