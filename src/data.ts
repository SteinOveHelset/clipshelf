import type { Idea } from "./types";

export const seedIdeas: Idea[] = [
  {
    id: "first-box",
    title: "Give an AI agent its own computer",
    notes:
      "A hands-on Discobox experiment. Let the agent fix a small bug while I keep working in my own checkout.",
    status: "Ready",
    createdAt: "2026-11-17",
  },
  {
    id: "desk-tour",
    title: "The quiet desk setup",
    notes:
      "A simple tour of the tools I actually use. Include the microphone, warm lighting, and a few cable-management tricks.",
    status: "Draft",
    createdAt: "2026-11-16",
  },
  {
    id: "three-agents",
    title: "Three agents, one afternoon",
    notes:
      "Try a bug fix, a search feature, and a mobile layout in parallel. Measure review time as well as waiting time.",
    status: "Draft",
    createdAt: "2026-11-15",
  },
  {
    id: "git-review",
    title: "From first prompt to reviewed code",
    notes:
      "Walk through one small feature from a clean Git commit to a reviewed branch. Show the checks and the mistakes.",
    status: "Ready",
    createdAt: "2026-11-14",
  },
  {
    id: "weekend-build",
    title: "What I built this weekend",
    notes:
      "A tiny reading tracker, a cup of coffee, and a lesson about keeping side projects small.",
    status: "Published",
    createdAt: "2026-11-12",
  },
  {
    id: "api-secret",
    title: "The key the agent never sees",
    notes:
      "Explain credential placeholders with a disposable API token. Compare one allowed request with one denied request.",
    status: "Draft",
    createdAt: "2026-11-10",
  },
  {
    id: "refactor",
    title: "A refactor worth throwing away?",
    notes:
      "Try simplifying our date helper, preserve behavior, and make an honest keep-or-discard decision.",
    status: "Draft",
    createdAt: "2026-11-08",
  },
  {
    id: "small-tools",
    title: "Small tools, better habits",
    notes:
      "Three little scripts that made my workday calmer. Show the before and after instead of a long feature tour.",
    status: "Published",
    createdAt: "2026-11-06",
  },
];
