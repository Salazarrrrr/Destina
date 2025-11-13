"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

export function SearchSection({ id }: { id?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Cargar historial desde localStorage al iniciar
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]") as string[]
    setHistory(saved)
  }, [])

  // Detectar click fuera del historial para cerrarlo
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowHistory(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200)) // Simula API
    setIsLoading(false)

    // Guardar historial (máx. 5 últimas, sin duplicados)
    const prev = JSON.parse(localStorage.getItem("searchHistory") || "[]") as string[]
    let updatedHistory = [searchQuery, ...prev.filter((t) => t !== searchQuery)]
    updatedHistory = updatedHistory.slice(0, 4)

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
    setHistory(updatedHistory)

    setShowChat(true)
    setShowHistory(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const handleFocus = () => {
    if (history.length > 0) setShowHistory(true)
  }

  return (
    <section id={id} className="relative z- bg-gradient-to-br from-rose-50 to-pink-50 py-20 transition-all duration-700 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            showChat ? "opacity-60 scale-95 transform -translate-y-4" : "opacity-100 scale-100 transform translate-y-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Encuentra tu destino perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre alojamientos únicos y vive experiencias inolvidables en cualquier lugar del mundo
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            showChat ? "scale-95 opacity-90" : "scale-100 opacity-100"
          }`}
        >
          <div
            ref={wrapperRef}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-2 ..."
          >

            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-3 px-6 py-4">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  placeholder="¿A dónde quieres ir? Busca destinos, ciudades, países..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleFocus}
                  className="border-0 p-0 text-lg placeholder:text-gray-500 focus-visible:ring-0 bg-transparent"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

            {/* Historial de búsquedas - Añadido z-index alto para superponerse */}
            {showHistory && history.length > 0 && !showChat && (
              <div className="fixed left-1/2 top-[200px] w-full max-w-md -translate-x-1/2 z-[9999]">
                <ul className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {history.map((term, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => {
                        setSearchQuery(term)
                        handleSearch()
                        setShowHistory(false)
                      }}
                    >
                      <span className="flex-1 text-gray-800">
                        {term}
                      </span>
                      <button
                        className="text-gray-400 hover:text-red-500 ml-3 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          const newHistory = history.filter((_, idx) => idx !== i)
                          setHistory(newHistory)
                          localStorage.setItem("searchHistory", JSON.stringify(newHistory))
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Popular searches - Añadido z-index menor */}
        <div
          className={`max-w-2xl mx-auto mt-8 text-center transition-all duration-700 ease-out z-10 ${
            showChat ? "opacity-0 transform translate-y-4 pointer-events-none" : "opacity-100 transform translate-y-0"
          }`}
        >
          <p className="text-sm text-gray-600 mb-4">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Barcelona", "París", "Tokyo", "Nueva York", "Bali", "Roma"].map((city) => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setSearchQuery(city)
                  inputRef.current?.focus()
                }}
                disabled={isLoading}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div
          className={`max-w-4xl mx-auto mt-12 transition-all duration-700 ease-out ${
            showChat
              ? "opacity-100 transform translate-y-0 scale-100"
              : "opacity-0 transform translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          {showChat && (
            <ChatInterface
              initialQuery={searchQuery}
              onClose={() => setShowChat(false)}
              onNewSearch={(query) => {
                setSearchQuery(query)
                setShowChat(false)
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
