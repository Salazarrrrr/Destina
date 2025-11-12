/**
 * Formatea mensajes de chat convirtiendo Markdown a texto legible
 */

export function formatChatMessage(text: string): string {
  let formatted = text;

  // Eliminar separadores Markdown (---)
  formatted = formatted.replace(/^---+$/gm, "");

  // Convertir títulos ### a texto en mayúsculas
  formatted = formatted.replace(/^###+\s*(.+)$/gm, (match, title) => {
    return `\n${title.trim().toUpperCase()}\n`;
  });

  // Convertir ## a texto en mayúsculas con subrayado visual
  formatted = formatted.replace(/^##\s*(.+)$/gm, (match, title) => {
    return `\n${title.trim().toUpperCase()}\n${"=".repeat(title.trim().length)}\n`;
  });

  // Eliminar negritas **texto** -> texto (mantener el texto)
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "$1");

  // Eliminar cursivas *texto* -> texto
  formatted = formatted.replace(/\*([^*]+)\*/g, "$1");

  // Convertir listas con viñetas a formato más legible
  formatted = formatted.replace(/^\s*[\*\-\+]\s+/gm, "  • ");

  // Convertir listas numeradas
  formatted = formatted.replace(/^\s*(\d+)\.\s+/gm, "  $1) ");

  // Limpiar múltiples saltos de línea
  formatted = formatted.replace(/\n{3,}/g, "\n\n");

  // Limpiar espacios al inicio y final de cada línea
  formatted = formatted
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 || line === "") // Mantener líneas vacías intencionales
    .join("\n");

  // Agregar espacio antes de títulos en mayúsculas
  formatted = formatted.replace(/\n([A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{3,})\n/g, "\n\n$1\n");

  // Limpiar espacios múltiples
  formatted = formatted.replace(/[ \t]{2,}/g, " ");

  // Eliminar líneas vacías al inicio y final
  formatted = formatted.trim();

  return formatted;
}

/**
 * Formatea el mensaje para mostrar en el chat con mejor estructura
 */
export function formatMessageForDisplay(text: string): string {
  let formatted = formatChatMessage(text);

  // Dividir en párrafos y secciones
  const lines = formatted.split("\n");
  const formattedLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isListItem = /^[\s]*[•\d\)]/.test(line);
    const isTitle = /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{3,}$/.test(line.trim());

    // Agregar espacio antes de listas
    if (isListItem && !inList) {
      formattedLines.push("");
      inList = true;
    } else if (!isListItem && inList) {
      formattedLines.push("");
      inList = false;
    }

    // Agregar espacio antes de títulos
    if (isTitle && i > 0 && formattedLines[formattedLines.length - 1] !== "") {
      formattedLines.push("");
    }

    formattedLines.push(line);
  }

  return formattedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
