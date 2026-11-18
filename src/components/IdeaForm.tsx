import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { statuses, type IdeaInput } from "../types";

type Props = {
  initial?: IdeaInput;
  onSave: (idea: IdeaInput) => void;
  submitLabel?: string;
};

export function IdeaForm({
  initial,
  onSave,
  submitLabel = "Save idea",
}: Props) {
  const id = useId();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [status, setStatus] = useState<IdeaInput["status"]>(
    initial?.status ?? "Draft",
  );
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title) {
      setError("Give your idea a title.");
      return;
    }
    onSave({ title, notes, status });
    setError("");
    if (!initial) {
      setTitle("");
      setNotes("");
      setStatus("Draft");
    }
  }

  return (
    <form onSubmit={submit} noValidate className="idea-form">
      <div className="field">
        <label htmlFor={`${id}-title`}>What's the idea?</label>
        <input
          id={`${id}-title`}
          name="title"
          placeholder="A title to get you started…"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          required
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor={`${id}-notes`}>
          A few notes <span>optional</span>
        </label>
        <textarea
          id={`${id}-notes`}
          name="notes"
          placeholder="The hook, a rough outline, a little spark…"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-status`}>Where is it at?</label>
        <select
          id={`${id}-status`}
          name="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as IdeaInput["status"])
          }
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <button className="button primary" type="submit">
        {submitLabel}
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
