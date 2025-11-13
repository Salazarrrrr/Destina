import type { Metadata } from 'next'
import './globals.css'
import { AiSuggestionsProvider } from "@/context/AiSuggestionsContext"

export const metadata: Metadata = {
  title: 'Destina',
  description: 'Created by Salazar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AiSuggestionsProvider>
          {children}
        </AiSuggestionsProvider>
      </body>
    </html>
  )
}
