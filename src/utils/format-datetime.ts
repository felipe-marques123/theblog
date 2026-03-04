import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formateDatetime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formateRelativetime(rawDate: string): string {
  const date = new Date(rawDate);

  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

export function formatHour(timeStampMs: number): string {
  const date = new Date(timeStampMs);

  return format(date, "HH:mm:ss", {
    locale: ptBR,
  });
}