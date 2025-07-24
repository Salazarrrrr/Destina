"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useState } from "react"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simular búsqueda - aquí conectarías con tu API de Django
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Aquí redirigirías a la página de resultados
    console.log("Buscando:", searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Encuentra tu destino perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre alojamientos únicos y vive experiencias inolvidables en cualquier lugar del mundo
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-3 px-6 py-4">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="¿A dónde quieres ir? Busca destinos, ciudades, países..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 p-0 text-lg placeholder:text-gray-500 focus-visible:ring-0 bg-transparent"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 rounded-full px-8 py-4 h-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Loading animation overlay */}
          {isLoading && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 text-rose-500">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg font-medium">Explorando destinos increíbles...</span>
              </div>
            </div>
          )}
        </div>

        {/* Popular searches */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Barcelona", "París", "Tokyo", "Nueva York", "Bali", "Roma"].map((city) => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                className="rounded-full bg-white hover:bg-gray-50"
                onClick={() => {
                  setSearchQuery(city)
                  handleSearch()
                }}
                disabled={isLoading}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
