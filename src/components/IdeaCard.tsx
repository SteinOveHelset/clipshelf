import { ArrowUpRight, Pencil } from "lucide-react";
import type { Idea } from "../types";
import { formatIdeaDate, formatIdeaDateTime } from "../lib/dates";

export function IdeaCard({
  idea,
  number,
  onEdit,
}: {
  idea: Idea;
  number: number;
  onEdit: (idea: Idea) => void;
}) {
  return (
    <article className={`idea-card status-${idea.status.toLowerCase()}`}>
      <div className="card-top">
        <span className="idea-number">{String(number).padStart(2, "0")}</span>
        <span className={`status-badge ${idea.status.toLowerCase()}`}>
          <span />
          {idea.status}
        </span>
      </div>
      <h3>{idea.title}</h3>
      <p className="card-notes">
        {idea.notes ||
          "A little spark. Add a few notes when inspiration strikes."}
      </p>
      <div className="card-bottom">
        <time
          dateTime={idea.createdAt}
          title={formatIdeaDateTime(idea.createdAt)}
        >
          {formatIdeaDate(idea.createdAt)}
        </time>
        <button
          className="icon-button edit-button"
          onClick={() => onEdit(idea)}
          aria-label={`Edit ${idea.title || "idea"}`}
        >
          <Pencil size={15} aria-hidden="true" />
          <ArrowUpRight size={16} className="edit-arrow" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
