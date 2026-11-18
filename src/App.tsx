import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clapperboard,
  Lightbulb,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { IdeaCard } from "./components/IdeaCard";
import { IdeaForm } from "./components/IdeaForm";
import { Dialog } from "./components/Dialog";
import { createIdea } from "./lib/ideas";
import { freshIdeas, loadIdeas, saveIdeas } from "./lib/storage";
import { statuses, type Idea, type IdeaInput, type IdeaStatus } from "./types";

export default function App() {
  const [loaded] = useState(loadIdeas);
  const [ideas, setIdeas] = useState(loaded.ideas);
  const [warning, setWarning] = useState(loaded.warning);
  const [filter, setFilter] = useState<IdeaStatus | "All ideas">("All ideas");
  const [editing, setEditing] = useState<Idea | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [notice, setNotice] = useState("");
  const formRef = useRef<HTMLElement>(null);

  const counts = Object.fromEntries(
    statuses.map((status) => [
      status,
      ideas.filter((idea) => idea.status === status).length,
    ]),
  ) as Record<IdeaStatus, number>;
  const visible = ideas.filter(
    (idea) => filter === "All ideas" || idea.status === filter,
  );

  function persist(next: Idea[], message: string) {
    setIdeas(next);
    const saved = saveIdeas(next);
    setWarning(
      saved
        ? null
        : "Changes are visible now, but could not be saved in this browser. Keep this tab open to avoid losing them.",
    );
    setNotice(saved ? message : "Updated for this session only.");
  }

  function addIdea(input: IdeaInput) {
    persist([createIdea(input), ...ideas], "Idea added to your shelf.");
    setFilter("All ideas");
  }

  function closeEditor() {
    setEditing(null);
    setDeleting(false);
  }

  function editIdea(input: IdeaInput) {
    if (!editing) return;
    persist(
      ideas.map((idea) =>
        idea.id === editing.id ? { ...idea, ...input } : idea,
      ),
      "Idea updated.",
    );
    closeEditor();
  }

  function focusCapture() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    formRef.current?.querySelector("input")?.focus({ preventScroll: true });
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#shelf">
        Skip to ideas
      </a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="ClipShelf home">
          <span className="brand-mark">
            <Clapperboard size={22} strokeWidth={1.8} />
          </span>
          ClipShelf<span className="brand-dot">.</span>
        </a>
        <div className="header-right">
          <span className="workspace-label">YOUR CREATIVE WORKSPACE</span>
          <button className="button quiet" onClick={() => setResetting(true)}>
            <RotateCcw size={14} />
            Reset sample ideas
          </button>
          <span className="avatar" aria-label="Personal workspace">
            S
          </span>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />A LITTLE SPACE FOR BIG IDEAS
            </p>
            <h1 id="hero-title">
              Your next great video <br />
              starts <em>right here.</em>
            </h1>
            <p className="hero-description">
              Catch the spark. Shape the story. Keep your best ideas
              <br className="desktop-break" /> in one place, from the first
              thought to the final cut.
            </p>
            <button className="text-link" onClick={focusCapture}>
              Make room for an idea <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit" />
            <div className="art-note note-back">
              <span>LIGHTS, CAMERA…</span>
              <div className="note-lines" />
            </div>
            <div className="art-note note-front">
              <Lightbulb size={33} strokeWidth={1.4} />
              <span>
                That could
                <br />
                be a video.
              </span>
              <div className="note-rule" />
            </div>
            <Sparkles className="art-spark" size={33} strokeWidth={1.4} />
            <span className="art-caption">great things start small ↗</span>
          </div>
        </section>

        <section className="overview" aria-label="Shelf overview">
          <div className="overview-intro">
            <span className="tiny-label">A LOOK AT YOUR SHELF</span>
            <p>Little sparks. Real progress.</p>
          </div>
          <div className="stat">
            <strong>{String(ideas.length).padStart(2, "0")}</strong>
            <span>Ideas captured</span>
          </div>
          <div className="stat">
            <strong>{String(counts.Ready).padStart(2, "0")}</strong>
            <span>
              <i className="dot ready-dot" />
              Ready to record
            </span>
          </div>
          <div className="stat">
            <strong>{String(counts.Published).padStart(2, "0")}</strong>
            <span>
              <i className="dot published-dot" />
              Out in the world
            </span>
          </div>
        </section>

        {warning && (
          <div role="alert" className="storage-warning">
            {warning}
          </div>
        )}
        <div className="workspace">
          <section id="shelf" className="shelf" aria-labelledby="shelf-title">
            <div className="section-heading">
              <h2 id="shelf-title">
                The idea shelf <span>{ideas.length}</span>
              </h2>
              <span className="sort-label">
                Newest first <ArrowDown size={13} />
              </span>
            </div>
            <div className="filter-row" aria-label="Filter ideas by status">
              {(["All ideas", ...statuses] as const).map((status) => (
                <button
                  key={status}
                  className={`filter ${filter === status ? "active" : ""}`}
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                >
                  {status}{" "}
                  <span>
                    {status === "All ideas" ? ideas.length : counts[status]}
                  </span>
                </button>
              ))}
            </div>
            <div className="idea-grid">
              {visible.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  number={ideas.indexOf(idea) + 1}
                  onEdit={setEditing}
                />
              ))}
            </div>
            {visible.length === 0 && (
              <div className="empty-state">
                <Lightbulb size={30} strokeWidth={1.5} />
                <h3>
                  {filter === "All ideas"
                    ? "Every video starts with an idea."
                    : `No ${filter.toLowerCase()} ideas just yet.`}
                </h3>
                <p>
                  {filter === "All ideas"
                    ? "Capture your first spark in the form beside your shelf."
                    : "Change an idea’s status when it reaches this stage."}
                </p>
                <button
                  className="text-link"
                  onClick={
                    filter === "All ideas"
                      ? focusCapture
                      : () => setFilter("All ideas")
                  }
                >
                  {filter === "All ideas"
                    ? "Add your first idea"
                    : "See all ideas"}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </section>

          <aside
            className="capture-column"
            ref={formRef}
            aria-labelledby="capture-title"
          >
            <div className="capture-panel">
              <span className="capture-icon">
                <Plus size={22} />
              </span>
              <p className="tiny-label">BEFORE YOU FORGET</p>
              <h2 id="capture-title">Catch an idea.</h2>
              <p className="capture-intro">
                It doesn't have to be polished.
                <br />
                It just has to start somewhere.
              </p>
              <IdeaForm onSave={addIdea} />
              <p className="save-note">
                <Check size={13} />
                Saved in this browser. Just for you.
              </p>
            </div>
            <div className="little-note">
              <Sparkles size={19} strokeWidth={1.5} />
              <p>
                “You don't need a perfect idea.
                <br />
                Just one you're curious about.”
              </p>
              <span>A NOTE TO YOUR FUTURE SELF</span>
            </div>
          </aside>
        </div>
        <div role="status" aria-live="polite" className="notification">
          {notice}
        </div>
      </main>

      <footer>
        <span className="footer-brand">ClipShelf.</span>
        <span>A little space for a lot of possibility.</span>
        <span>Made for the making.</span>
      </footer>

      {editing && (
        <Dialog
          title={deleting ? "Delete this idea?" : "A little room to refine."}
          onClose={closeEditor}
        >
          {deleting ? (
            <>
              <p className="dialog-copy">
                This removes “{editing.title || "Untitled idea"}” from your
                shelf. Your other ideas will stay.
              </p>
              <div className="dialog-actions">
                <button
                  className="button secondary"
                  onClick={() => setDeleting(false)}
                >
                  Keep idea
                </button>
                <button
                  className="button danger"
                  onClick={() => {
                    persist(
                      ideas.filter((idea) => idea.id !== editing.id),
                      "Idea deleted.",
                    );
                    closeEditor();
                  }}
                >
                  Delete permanently
                </button>
              </div>
            </>
          ) : (
            <>
              <IdeaForm
                initial={editing}
                onSave={editIdea}
                submitLabel="Save changes"
              />
              <button className="delete-link" onClick={() => setDeleting(true)}>
                <Trash2 size={14} />
                Delete idea
              </button>
            </>
          )}
        </Dialog>
      )}
      {resetting && (
        <Dialog
          title="Start with a fresh shelf?"
          onClose={() => setResetting(false)}
        >
          <p className="dialog-copy">
            Replace the ideas in this browser with the eight original sample
            ideas. Your additions and edits will be removed.
          </p>
          <div className="dialog-actions">
            <button
              className="button secondary"
              onClick={() => setResetting(false)}
            >
              Keep my ideas
            </button>
            <button
              className="button primary"
              onClick={() => {
                persist(freshIdeas(), "Original sample ideas restored.");
                setFilter("All ideas");
                setResetting(false);
              }}
            >
              Restore samples
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
