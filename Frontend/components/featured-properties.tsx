"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAiSuggestions } from "@/context/AiSuggestionsContext"
import { featuredFallback } from "@/lib/destinationCatalog"

export function FeaturedProperties({ id }: { id?: string }) {
  const { destinations } = useAiSuggestions()

  const items = useMemo(
    () => (destinations.length > 0 ? destinations : featuredFallback()),
    [destinations]
  )

  const [visibleCount, setVisibleCount] = useState(() => Math.min(items.length, 4))

  useEffect(() => {
    setVisibleCount(Math.min(items.length, 4))
  }, [items])

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, items.length))
  }

  const canShowMore = visibleCount < items.length

  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Alojamientos destacados</h2>
          <p className="text-lg text-gray-600">Descubre los lugares más populares y mejor valorados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, visibleCount).map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <button className="text-left">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.priceRange && (
                        <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                          {item.priceRange}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>
                    </CardContent>
                  </Card>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 rounded-lg object-cover"
                  />
                  <p className="text-sm leading-relaxed text-gray-700">{item.summary}</p>
                  {item.highlights?.length > 0 && (
                    <ul className="space-y-1">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-gray-700 flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.bestSeason && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Mejor temporada:</span> {item.bestSeason}
                    </p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-center rounded-md border border-rose-500 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50 transition"
                    >
                      Ver más información
                    </a>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {canShowMore && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={handleShowMore}>
              Ver más alojamientos
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
