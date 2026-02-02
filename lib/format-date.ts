import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Formatea una fecha en formato largo en español
 * Ejemplo: "15 de febrero de 2025"
 */
export function formatDateLong(date: string | Date | null): string {
  if (!date) return "—";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch {
    return "—";
  }
}

/**
 * Formatea una fecha en formato corto
 * Ejemplo: "15/02/2025"
 */
export function formatDateShort(date: string | Date | null): string {
  if (!date) return "—";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy", { locale: es });
  } catch {
    return "—";
  }
}

/**
 * Formatea una fecha con hora
 * Ejemplo: "15 de febrero de 2025, 14:30"
 */
export function formatDateTime(date: string | Date | null): string {
  if (!date) return "—";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
  } catch {
    return "—";
  }
}
