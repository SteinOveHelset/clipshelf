import { seedIdeas } from "../data";
import { statuses, type Idea } from "../types";

export const STORAGE_KEY = "clipshelf.ideas.v1";
export type LoadedIdeas = { ideas: Idea[]; warning: string | null };

function isIdea(value: unknown): value is Idea {
  if (!value || typeof value !== "object") return false;
  const idea = value as Partial<Idea>;
  return (
    typeof idea.id === "string" &&
    typeof idea.title === "string" &&
    typeof idea.notes === "string" &&
    typeof idea.createdAt === "string" &&
    statuses.includes(idea.status as Idea["status"])
  );
}

export function freshIdeas(): Idea[] {
  return seedIdeas.map((idea) => ({ ...idea }));
}

export function loadIdeas(): LoadedIdeas {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return { ideas: freshIdeas(), warning: null };
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isIdea))
      throw new Error("Invalid saved data");
    return { ideas: parsed, warning: null };
  } catch {
    return {
      ideas: freshIdeas(),
      warning:
        "Your saved shelf could not be loaded. Sample ideas are shown. Changes will replace the saved data.",
    };
  }
}

export function saveIdeas(ideas: Idea[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    return true;
  } catch {
    return false;
  }
}
