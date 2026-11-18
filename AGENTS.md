# ClipShelf development

This is a recording fixture for small AI-coding tasks. Implement the task the user actually asks for; don't proactively complete unrelated recording exercises.

## Project

- React + TypeScript + Vite; Node 22.12+; npm lockfile committed.
- `npm ci`, `npm run dev`, `npm test`, `npm run typecheck`, `npm run build`.
- `npm run test:dates` checks the date contract in three timezones.
- Browser-local persistence; no backend or credentials required.
- UI text should stay focused on the video-idea tracker, not implementation details.

## Working agreement

- Keep changes scoped. Title validation, search, mobile layout, and date refactoring are separate recording tasks.
- The baseline intentionally accepts whitespace-only titles, has no text search, and overflows on phones. Fix these when requested; their presence is not a prohibition against editing them.
- `it.todo` entries describe future behavior. Convert relevant entries into useful tests as part of that task. Do not replace them with assertions that preserve a bug.
- Preserve the desktop visual character when doing the mobile task. Check all controls at 375px as well as desktop; don't just hide overflow.
- Reuse current components and dependencies unless the requested change needs more.
- For date refactors, read `docs/DATE-CONTRACT.md` and run the matrix. Don't rewrite expected values to make a changed contract pass.
- Run relevant tests and typecheck; build before handing back a completed feature.
- The user decides whether to commit, push, or merge. Follow their explicit task instructions for that handoff.
- Don't move the `recording-baseline` tag or discard existing episode work.
