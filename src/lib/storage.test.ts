import { beforeEach, describe, expect, it, vi } from "vitest";
import { freshIdeas, loadIdeas, saveIdeas, STORAGE_KEY } from "./storage";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("browser persistence", () => {
  it("loads deterministic examples on first visit", () => {
    expect(loadIdeas().ideas).toHaveLength(8);
    expect(loadIdeas().warning).toBeNull();
  });
  it("restores an intentionally empty shelf without reseeding it", () => {
    expect(saveIdeas([])).toBe(true);
    expect(loadIdeas().ideas).toEqual([]);
  });
  it("round-trips edits", () => {
    const ideas = freshIdeas();
    ideas[0].notes = "An updated outline.";
    saveIdeas(ideas);
    expect(loadIdeas().ideas[0].notes).toBe("An updated outline.");
  });
  it.each(["not json", '{"ideas":[]}', '[{"title":"oops"}]'])(
    "recovers from invalid saved data without crashing",
    (saved) => {
      localStorage.setItem(STORAGE_KEY, saved);
      expect(loadIdeas().ideas).toHaveLength(8);
      expect(loadIdeas().warning).toBeTruthy();
    },
  );
  it("reports persistence failures", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Quota exceeded");
    });
    expect(saveIdeas(freshIdeas())).toBe(false);
  });
});
