import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatMessageForDisplay } from "@/lib/formatChatMessage";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Almacenamiento en memoria del contexto de conversación
// En producción, deberías usar Redis o una base de datos
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

// Función para limpiar y estructurar la respuesta de Gemini
function cleanAndStructureResponse(text: string): {
  text: string;
  structuredData?: {
    destinations?: string[];
    dates?: { start?: string; end?: string };
    preferences?: string[];
    budget?: string;
  };
} {
  // Formatear el mensaje para que sea más legible
  let cleanedText = formatMessageForDisplay(text);

  // Extraer información estructurada (mantener la lógica existente)
  const structuredData: {
    destinations?: string[];
    dates?: { start?: string; end?: string };
    preferences?: string[];
    budget?: string;
  } = {};

  // Extraer destinos mencionados
  const destinationPattern = /(?:en|a|hacia|destino:|viaje a)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi;
  const destinations = Array.from(
    cleanedText.matchAll(destinationPattern),
    (m) => m[1]
  );
  if (destinations.length > 0) {
    structuredData.destinations = [...new Set(destinations)];
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
  const budgetPattern = /(\d+(?:\.\d+)?)\s*(\$|USD|pesos?|euros?)/gi;
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

    // Configurar el modelo con el historial de conversación
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
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