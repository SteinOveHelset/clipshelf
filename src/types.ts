export const statuses = ["Draft", "Ready", "Published"] as const;
export type IdeaStatus = (typeof statuses)[number];
export type Idea = {
  id: string;
  title: string;
  notes: string;
  status: IdeaStatus;
  createdAt: string;
};
export type IdeaInput = Pick<Idea, "title" | "notes" | "status">;
