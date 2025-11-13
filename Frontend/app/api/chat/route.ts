import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatMessageForDisplay } from "@/lib/formatChatMessage";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Almacenamiento en memoria del contexto de conversación
interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

interface ChatSession {
  history: ChatMessage[];
  sessionId: string;
  createdAt: Date;
  lastActivity: Date;
}

interface DestinationData {
  name: string;
  location?: string;
  city?: string;
  price?: number;
  rating?: number;
  image?: string | null;  // ✅ Permitir null
  badge?: string;
  description?: string;
}

const chatSessions = new Map<string, ChatSession>();

// Limpiar sesiones antiguas cada hora (sesiones inactivas por más de 24 horas)
setInterval(() => {
  const now = new Date();
  const maxAge = 24 * 60 * 60 * 1000; // 24 horas
  
  for (const [sessionId, session] of chatSessions.entries()) {
    if (now.getTime() - session.lastActivity.getTime() > maxAge) {
      chatSessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000); // Ejecutar cada hora

// Sistema de instrucciones para Gemini con límite de palabras
const SYSTEM_INSTRUCTION = `Eres un asistente de viajes especializado en destinos de Colombia. 

REGLAS IMPORTANTES:
1. Todas tus respuestas deben ser MÁXIMO 200 palabras
2. Sé conciso, claro y directo
3. Evita repeticiones innecesarias

Cuando sugieras destinos turísticos, SIEMPRE usa este formato EXACTO:

1) [Nombre del Destino]: [Descripción breve en 1-2 líneas]
2) [Nombre del Destino]: [Descripción breve en 1-2 líneas]
3) [Nombre del Destino]: [Descripción breve en 1-2 líneas]

Ejemplo:
1) Cartagena: Ciudad histórica en la costa caribeña con playas hermosas y arquitectura colonial.
2) Eje Cafetero: Región montañosa famosa por su café de calidad mundial y paisajes verdes.

IMPORTANTE: 
- Numera los destinos con formato "1)", "2)", etc.
- Usa dos puntos ":" después del nombre
- Una descripción por línea
- Máximo 200 palabras en total

Recuerda: NUNCA excedas las 200 palabras.`;

// Función para limpiar y estructurar la respuesta de Gemini
function cleanAndStructureResponse(text: string): {
  text: string;
  structuredData?: {
    destinations?: DestinationData[];  // ✅ Cambiado de string[] a DestinationData[]
    dates?: { start?: string; end?: string };
    preferences?: string[];
    budget?: string;
  };
} {
  // Formatear el mensaje para que sea más legible
  let cleanedText = formatMessageForDisplay(text);

  // Extraer información estructurada
  const structuredData: {
    destinations?: DestinationData[];  // ✅ Cambiado de string[] a DestinationData[]
    dates?: { start?: string; end?: string };
    preferences?: string[];
    budget?: string;
  } = {};

  // EXTRAER DESTINOS usando el formato "1) Nombre:"
  const destinationPattern = /(\d+)\)\s*([^:]+):\s*([^\n]+)/gi;
  const destinationMatches = Array.from(cleanedText.matchAll(destinationPattern));
  
  if (destinationMatches.length > 0) {
    structuredData.destinations = destinationMatches.map((match) => {
      const name = match[2].trim();
      const description = match[3].trim();
      
      // Generar precio aleatorio realista para Colombia (entre 300k y 1.5M)
      const price = Math.floor(Math.random() * (1500000 - 300000) + 300000);
      
      // Rating aleatorio entre 4.0 y 5.0
      const rating = parseFloat((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1));
      
      // Determinar badge según palabras clave en la descripción
      let badge = "Destino";
      if (description.toLowerCase().includes("playa") || description.toLowerCase().includes("costa")) {
        badge = "Playa";
      } else if (description.toLowerCase().includes("montaña") || description.toLowerCase().includes("montañ")) {
        badge = "Montaña";
      } else if (description.toLowerCase().includes("ciudad") || description.toLowerCase().includes("históric")) {
        badge = "Ciudad";
      } else if (description.toLowerCase().includes("naturaleza") || description.toLowerCase().includes("parque")) {
        badge = "Naturaleza";
      }
      
      return {
        name,
        location: "Colombia",
        city: name,
        price,
        rating,
        image: null, // Por ahora null, puedes agregar un mapa de imágenes después
        badge,
        description
      };
    });
  }

  // Extraer fechas
  const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g;
  const dates = Array.from(cleanedText.matchAll(datePattern));
  if (dates.length >= 2) {
    structuredData.dates = {
      start: dates[0][1],
      end: dates[1][1],
    };
  } else if (dates.length === 1) {
    structuredData.dates = {
      start: dates[0][1],
    };
  }

  // Extraer presupuesto
  const budgetPattern = /(\d+(?:\.\d+)?)\s*(\$|USD|pesos?|euros?|COP)/gi;
  const budgetMatch = cleanedText.match(budgetPattern);
  if (budgetMatch) {
    structuredData.budget = budgetMatch[0];
  }

  // Extraer preferencias
  const preferences: string[] = [];
  const preferenceKeywords = [
    "playa",
    "montaña",
    "ciudad",
    "aventura",
    "relajante",
    "familiar",
    "romántico",
    "económico",
    "lujo",
  ];
  preferenceKeywords.forEach((keyword) => {
    if (cleanedText.toLowerCase().includes(keyword)) {
      preferences.push(keyword);
    }
  });
  if (preferences.length > 0) {
    structuredData.preferences = preferences;
  }

  return {
    text: cleanedText,
    structuredData: Object.keys(structuredData).length > 0 ? structuredData : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const { message, sessionId, history } = await request.json();

    if (!message) {
      return Response.json(
        { error: "El mensaje es requerido" },
        { status: 400 }
      );
    }

    // Generar o usar sessionId existente
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Obtener o crear sesión
    let session = chatSessions.get(currentSessionId);
    if (!session) {
      session = {
        sessionId: currentSessionId,
        history: [],
        createdAt: new Date(),
        lastActivity: new Date(),
      };
      chatSessions.set(currentSessionId, session);
    }

    // Actualizar última actividad
    session.lastActivity = new Date();

    // Agregar mensaje del usuario al historial
    session.history.push({
      role: "user",
      parts: message,
    });

    // Configurar el modelo con systemInstruction para límite de palabras
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });
    
    // Preparar el historial para Gemini (formato de chat)
    const chat = model.startChat({
      history: session.history.slice(0, -1).map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.parts }],
      })),
    });

    // Enviar el mensaje actual con contexto
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    // Limpiar y estructurar la respuesta
    const cleanedResponse = cleanAndStructureResponse(responseText);

    // Agregar respuesta del modelo al historial
    session.history.push({
      role: "model",
      parts: responseText,
    });

    // Limitar el historial a los últimos 20 mensajes para evitar tokens excesivos
    if (session.history.length > 20) {
      session.history = session.history.slice(-20);
    }

    return Response.json({
      text: cleanedResponse.text,
      structuredData: cleanedResponse.structuredData,
      sessionId: currentSessionId,
      messageCount: session.history.length,
    });
  } catch (error) {
    console.error("Error en la API de Gemini:", error);
    return Response.json(
      { error: "Error al procesar el mensaje", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Endpoint para obtener el historial de una sesión
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return Response.json(
        { error: "sessionId es requerido" },
        { status: 400 }
      );
    }

    const session = chatSessions.get(sessionId);
    if (!session) {
      return Response.json(
        { error: "Sesión no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      sessionId: session.sessionId,
      history: session.history,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity,
      messageCount: session.history.length,
    });
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return Response.json(
      { error: "Error al obtener el historial" },
      { status: 500 }
    );
  }
}

// Endpoint para eliminar una sesión
export async function DELETE(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return Response.json(
        { error: "sessionId es requerido" },
        { status: 400 }
      );
    }

    const deleted = chatSessions.delete(sessionId);
    return Response.json({
      success: deleted,
      message: deleted ? "Sesión eliminada" : "Sesión no encontrada",
    });
  } catch (error) {
    console.error("Error al eliminar sesión:", error);
    return Response.json(
      { error: "Error al eliminar la sesión" },
      { status: 500 }
    );
  }
}