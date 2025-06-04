import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatRelativeTime(dateInput?: Date | string): string {
  if (!dateInput) return "some time ago";

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  if (isToday(date)) {
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    return distance === "less than a minute ago" ? "Just now" : distance;
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
}
