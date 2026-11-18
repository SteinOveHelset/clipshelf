import { beforeEach, describe, expect, it } from "vitest";
import { StrictMode } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { STORAGE_KEY } from "./lib/storage";

beforeEach(() => localStorage.clear());

describe("ClipShelf core workflows", () => {
  it("keeps the reset dialog open under React StrictMode", async () => {
    const user = userEvent.setup();
    render(<StrictMode><App /></StrictMode>);
    await user.click(screen.getByRole("button", { name: "Reset sample ideas" }));
    expect(screen.getByRole("dialog")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Keep my ideas" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows eight examples and filters by status", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole("article")).toHaveLength(8);
    await user.click(screen.getByRole("button", { name: "Ready 2" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("heading", {
        name: "Give an AI agent its own computer",
      }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "All ideas 8" }));
    expect(screen.getAllByRole("article")).toHaveLength(8);
  });

  it("adds a valid idea and restores it after remounting", async () => {
    const user = userEvent.setup();
    const app = render(<App />);
    await user.type(
      screen.getByLabelText("What's the idea?"),
      "A camera comparison",
    );
    await user.type(
      screen.getByLabelText(/A few notes/),
      "Compare indoor footage.",
    );
    await user.click(screen.getByRole("button", { name: "Save idea" }));
    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(
      screen.getByRole("heading", { name: "A camera comparison" }),
    ).toBeInTheDocument();
    app.unmount();
    render(<App />);
    expect(screen.getByText("Compare indoor footage.")).toBeInTheDocument();
  });

  it("rejects a truly empty title and keeps the notes", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/A few notes/), "Keep my outline.");
    await user.click(screen.getByRole("button", { name: "Save idea" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Give your idea a title.",
    );
    expect(screen.getByLabelText(/A few notes/)).toHaveValue(
      "Keep my outline.",
    );
    expect(screen.getAllByRole("article")).toHaveLength(8);
  });

  it("edits an idea and its status", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Edit The quiet desk setup" }),
    );
    const dialog = within(screen.getByRole("dialog"));
    await user.clear(dialog.getByLabelText("What's the idea?"));
    await user.type(
      dialog.getByLabelText("What's the idea?"),
      "My desk, simplified",
    );
    await user.selectOptions(dialog.getByLabelText("Where is it at?"), "Ready");
    await user.click(dialog.getByRole("button", { name: "Save changes" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "My desk, simplified" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ready 3" })).toBeInTheDocument();
  });

  it("requires confirmation to delete an idea", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Edit The quiet desk setup" }),
    );
    await user.click(screen.getByRole("button", { name: "Delete idea" }));
    expect(screen.getAllByRole("article")).toHaveLength(8);
    await user.click(screen.getByRole("button", { name: "Keep idea" }));
    await user.click(screen.getByRole("button", { name: "Delete idea" }));
    await user.click(
      screen.getByRole("button", { name: "Delete permanently" }),
    );
    expect(screen.getAllByRole("article")).toHaveLength(7);
    expect(
      screen.queryByRole("heading", { name: "The quiet desk setup" }),
    ).not.toBeInTheDocument();
  });

  it("resets sample data only after confirmation", async () => {
    const user = userEvent.setup();
    localStorage.setItem(STORAGE_KEY, "[]");
    render(<App />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    await user.click(
      screen.getByRole("button", { name: "Reset sample ideas" }),
    );
    await user.click(screen.getByRole("button", { name: "Keep my ideas" }));
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    await user.click(
      screen.getByRole("button", { name: "Reset sample ideas" }),
    );
    await user.click(screen.getByRole("button", { name: "Restore samples" }));
    expect(screen.getAllByRole("article")).toHaveLength(8);
  });

  // These are recording tasks, not assertions that lock the bugs in place.
  it.todo(
    "rejects whitespace-only titles and trims valid titles on create and edit",
  );
  it.todo(
    "searches titles and notes without case sensitivity, with clear and empty results",
  );
});
