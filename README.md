# ClipShelf

A small, local video-idea tracker built for the Discobox recording series. React, TypeScript, Vite, and ordinary CSS. It comes with eight realistic ideas and deliberately unfinished tasks you can give to an agent on camera.

## Start

Use Node.js **22.12 or newer**. From this directory:

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally http://localhost:5173. In a Discobox, use the forwarded URL shown by its console. The dev server listens on all interfaces to support box previews. It does not require an API key, database, login, or a cloud account. Fonts are bundled locally.

## What's ready

- Create, edit, and delete ideas with titles, notes, creation dates, and Draft / Ready / Published statuses.
- Filter by status and see live counts.
- Persist your shelf in browser localStorage.
- Restore the original eight examples with **Reset sample ideas → Restore samples**.
- Edit using the pencil button on each card. Deletion requires a separate confirmation.
- Date labels and tooltips through a small `date-fns` utility, with characterization tests.

## What is deliberately unfinished

| Recording task | Baseline behavior | Intended task for the agent |
| --- | --- | --- |
| Title validation | An empty string is rejected, but spaces-only titles save as blank cards. Valid titles retain surrounding spaces. The same form is used for create and edit. | Reject empty/whitespace-only titles, trim valid titles, preserve notes on a validation error, add regression coverage. |
| Search | Status filters exist; text search does not. | Add case-insensitive title-and-notes search, a clear/reset interaction, and a no-results state. |
| Mobile layout | Desktop-oriented widths and two-column layout overflow at 375px. | Make the entire app usable at phone width without hiding functionality or regressing desktop. |
| Refactor | Only `src/lib/dates.ts` imports `date-fns`. | Investigate replacing it with built-in APIs while preserving the tested contract. Keeping the dependency is an acceptable outcome. |

These are intentional recording exercises. They are not fixed solutions or feature toggles. The normal tests pass; two clearly marked `todo` cases identify future validation/search coverage without asserting that broken behavior must remain forever.

The mobile overflow is confined to layout CSS. The desktop design is the intended visual reference. There is no separate mobile feature flag.

## Checks

```sh
npm test             # Core workflows, persistence, and dates
npm run typecheck    # TypeScript
npm run test:dates   # Date contract in UTC, Madrid, and Los Angeles
npm run build       # Type-check and production build
npm run check       # All of the above
```

Vitest's `todo` entries are planned work, not failures. The date matrix launches a fresh process for each timezone. On a machine with a different local timezone, the ordinary suite may skip its two timezone-specific examples; the matrix always exercises all three configured zones.

## Record from a clean baseline

The supplied local repository has a `recording-baseline` tag. Keep that tag unchanged. For a new episode, create a new branch from it:

```sh
git status --short
git switch -c episode/search recording-baseline
```

Commit or stash useful work before switching. Use a different new branch name for each take. This leaves previous episode branches intact. For three parallel tasks, start all boxes from this same baseline commit; don't merge a task before creating the other boxes.

**Git and browser data are separate.** Switching branches does not reset localStorage. Use the app's sample reset before each recording. Each browser origin (scheme, hostname, and port) has its own shelf: different forwarded box URLs may therefore show different data. Same-origin tabs share storage, but a second tab needs a reload to display changes from the first.

If you downloaded the ZIP, it contains source and the lockfile, but not Git history or node_modules. Initialize your copy once:

```sh
git init -b main
git add .
git commit -m "ClipShelf recording baseline"
git tag recording-baseline
```

Git uses your normal commit identity. Add your own writable remote for the tutorial's branch/pull-request handoff; no account or remote is configured in this demo.

## Follow the scripts

See [the recording guide](docs/RECORDING.md) for exact reproduction steps, search examples, prompts, script-placeholder values, and parallel-task setup. See [the date contract](docs/DATE-CONTRACT.md) before the refactor episode.

The API-key episode uses a separate credential/access demonstration. ClipShelf doesn't need an API token and should stay that way; use the disposable GitHub repository and token described in that script.

## Source map

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Shelf state, filters, counts, and dialogs |
| `src/components/IdeaForm.tsx` | Shared create/edit form and current validation |
| `src/components/IdeaCard.tsx` | Cards, dates, and edit buttons |
| `src/styles.css` | Desktop styling and the responsive-layout exercise |
| `src/data.ts` | Deterministic sample ideas |
| `src/lib/storage.ts` | Versioned browser persistence |
| `src/lib/dates.ts` | The two date-fns wrappers |
| `src/App.test.tsx` | User-oriented workflow tests |
| `src/lib/dates.test.ts` | Date characterization tests |

## Scope

This is a single-user recording fixture with browser-local data, not a hosted multi-user product. Resetting samples replaces additions and edits in the current browser origin. Don't put important notes or credentials in this demo.

At creation, npm's audit database reported a ReDoS advisory for the latest `picomatch` used transitively by the development/test tools. The registry's latest version was still affected; no forced downgrade was applied. These tools process the project's own glob patterns. Recheck with `npm audit` when updating dependencies. This is separate from the intentional app exercises above.
