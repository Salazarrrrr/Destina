"use client"

import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import type { DestinationInfo } from "@/lib/destinationCatalog"

interface AiSuggestionsState {
  destinations: DestinationInfo[]
  setDestinations: (items: DestinationInfo[]) => void
  reset: () => void
}

const AiSuggestionsContext = createContext<AiSuggestionsState | null>(null)

export function AiSuggestionsProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinationsState] = useState<DestinationInfo[]>([])

  const value = useMemo(
    () => ({
      destinations,
      setDestinations: (items: DestinationInfo[]) => setDestinationsState(items),
      reset: () => setDestinationsState([]),
    }),
    [destinations]
  )

  return (
    <AiSuggestionsContext.Provider value={value}>
      {children}
    </AiSuggestionsContext.Provider>
  )
}

export function useAiSuggestions() {
  const ctx = useContext(AiSuggestionsContext)
  if (!ctx) {
    throw new Error("useAiSuggestions debe usarse dentro de AiSuggestionsProvider")
  }
  return ctx
}
