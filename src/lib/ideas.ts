import type { Idea, IdeaInput } from "../types";

export function createIdea(input: IdeaInput): Idea {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}
