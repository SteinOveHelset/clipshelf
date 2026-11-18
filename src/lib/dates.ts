import { format, isValid, parseISO } from "date-fns";

// Display in English and in the viewer's local timezone.
// Date-only inputs represent a local calendar day; timestamps represent instants.
export function formatIdeaDate(value: string): string {
  const date = parseISO(value);
  return isValid(date) ? format(date, "MMM d, yyyy") : "Unknown date";
}

export function formatIdeaDateTime(value: string): string {
  const date = parseISO(value);
  return isValid(date) ? format(date, "MMM d, yyyy · h:mm a") : "Unknown date";
}
