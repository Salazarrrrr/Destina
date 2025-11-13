/**
 * Utilidades para limpiar y procesar respuestas de la IA
 */

export interface StructuredChatData {
  destinations?: string[];
  dates?: { start?: string; end?: string };
  preferences?: string[];
  budget?: string;
  activities?: string[];
}

/**
 * Normaliza el texto eliminando caracteres especiales y formateo excesivo
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\*\*\*/g, "**")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Extrae información estructurada del texto
 */
export function extractStructuredData(text: string): StructuredChatData {
  const data: StructuredChatData = {};

  // Destinos
  const destinationPattern = /(?:en|a|hacia|destino:|viaje a)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi;
  const destinations = Array.from(
    text.matchAll(destinationPattern),
    (m) => m[1]
  );
  if (destinations.length > 0) {
    data.destinations = [...new Set(destinations)];
  }

  // Fechas
  const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g;
  const dates = Array.from(text.matchAll(datePattern));
  if (dates.length >= 2) {
    data.dates = { start: dates[0][1], end: dates[1][1] };
  } else if (dates.length === 1) {
    data.dates = { start: dates[0][1] };
  }

  // Presupuesto
  const budgetPattern = /(\d+(?:\.\d+)?)\s*(\$|USD|pesos?|euros?)/gi;
  const budgetMatch = text.match(budgetPattern);
  if (budgetMatch) {
    data.budget = budgetMatch[0];
  }

  // Preferencias
  const preferenceKeywords = [
    "playa", "montaña", "ciudad", "aventura", "relajante",
    "familiar", "romántico", "económico", "lujo",
  ];
  const preferences = preferenceKeywords.filter((keyword) =>
    text.toLowerCase().includes(keyword)
  );
  if (preferences.length > 0) {
    data.preferences = preferences;
  }

  // Actividades
  const activityKeywords = [
    "senderismo", "buceo", "surf", "museos", "gastronomía",
    "noche", "compras", "playa", "montaña",
  ];
  const activities = activityKeywords.filter((keyword) =>
    text.toLowerCase().includes(keyword)
  );
  if (activities.length > 0) {
    data.activities = activities;
  }

  return data;
}

/**
 * Valida y sanitiza datos estructurados
 */
export function validateStructuredData(data: StructuredChatData): StructuredChatData {
  const validated: StructuredChatData = {};

  if (data.destinations && data.destinations.length > 0) {
    validated.destinations = data.destinations.filter((d) => d.length > 2);
  }

  if (data.dates) {
    validated.dates = {};
    if (data.dates.start) {
      validated.dates.start = data.dates.start;
    }
    if (data.dates.end) {
      validated.dates.end = data.dates.end;
    }
  }

  if (data.budget) {
    validated.budget = data.budget;
  }

  if (data.preferences && data.preferences.length > 0) {
    validated.preferences = data.preferences;
  }

  if (data.activities && data.activities.length > 0) {
    validated.activities = data.activities;
  }

  return validated;
}
