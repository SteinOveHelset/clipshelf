# Recording with ClipShelf

## Start of every take

1. Create a fresh episode branch from `recording-baseline`, with useful earlier work committed or stashed.
2. Run `npm ci` and `npm run dev`.
3. Use **Reset sample ideas → Restore samples** in the preview you will record. This affects that browser origin only.
4. Run `git status --short`, `git log -1 --oneline`, and `npm test` before creating a box. The baseline has eight ideas: four Draft, two Ready, two Published.
5. Capture at 1280–1440px viewport width at 100% zoom for the desktop reference. Use 375px for the mobile exercise.

Do not reset or change a real working project to stage these examples. This repository is the disposable demo.

## Fill the script placeholders

| Placeholder | Value |
| --- | --- |
| `[PROJECT_DIRECTORY]` | This repository's absolute path |
| `[DEV_COMMAND]` | `npm run dev` |
| `[TEST_COMMAND]` | `npm test` |
| `[TYPECHECK_COMMAND]` | `npm run typecheck` |
| Full verification | `npm run check` |
| Date verification | `npm run test:dates` |
| `[BASE_BRANCH]` | Your clean episode branch, or `main` for the first take |
| Baseline reference | `recording-baseline` |
| `[DEMO_REMOTE_URL]` | Your own writable GitHub/GitLab test repository URL; not supplied |

The supplied local repo has a baseline commit and tag. A source ZIP requires the one-time Git initialization from the README. Discobox uses committed source by default, so commit any intended setup changes before creating boxes.

## Episode 1: First task, setup to reviewed code

The app starts without text search. The status pills are filters, not search. Add title-and-notes search while keeping status filtering functional.

Useful search examples after implementation:

| Query | Expected sample |
| --- | --- |
| `quiet` / `QUIET` | The quiet desk setup |
| `microphone` | The quiet desk setup, through notes only |
| `credential` | The key the agent never sees, through notes only |
| `zzzz-no-match` | No results message |
| Empty query | All ideas allowed by the selected status filter |

To prove independent filters, search `quiet` under Ready (no match), then Draft (one match). Clear the search and confirm the selected status still applies. The tutorial can keep this extra case short.

Suggested launch:

```sh
discobox run . 'Add case-insensitive search across idea titles and notes. Clearing restores ideas in the selected status filter. Show a useful no-results state. Preserve the design and dependencies. Add focused tests, run npm test and npm run typecheck, and stop before committing.'
```

Inside a fresh box, use `npm ci`, then `npm run dev`; open the forwarded URL Discobox reports. Actual ports may differ between boxes. When you accept the feature, save it to your own branch/remote using the script's Git review flow. No remote has been created automatically.

## Episode 2: Agent gets its own computer

### Reproduce the title bug

1. In **What's the idea?**, enter three space characters.
2. Enter `This should not become a blank card.` in notes.
3. Click **Save idea**. The shelf grows from eight to nine and a card with a blank heading appears first.
4. Reload: the blank card is still there, proving it was saved.
5. Reset samples before the agent fixes it, so a legacy invalid record does not confuse the after shot.

The completely empty input already shows an error. The missing behavior is whitespace validation and trimming. Both create and edit use `IdeaForm.tsx`, so check both paths after the fix. A valid title like `  My next video  ` currently preserves its spaces in stored data even though HTML visually collapses some whitespace.

Suggested prompt:

```text
Fix title validation in the shared create/edit form. Reject empty or whitespace-only titles with a useful message. Trim valid titles before saving. Preserve notes after a rejected submission. Add regression tests and run the existing checks. Do not add search or change the layout. Stop before committing.
```

For the separate-checkout shot, add an uncommitted note locally after creating the box and show that the box's source is separate. Remove or save that note intentionally before starting another episode.

## Episode 3: Three parallel tasks

Start all three boxes from the same baseline commit. The naming flag is for readability; retain the returned box IDs.

```sh
discobox run -d --name 'A - title validation' . 'Reject whitespace-only idea titles and trim valid titles on create and edit. Preserve notes on errors. Add focused tests and run checks. Do not change search or layout. Stop before committing.'
discobox run -d --name 'B - idea search' . 'Add case-insensitive search across titles and notes, with clear and no-results behavior. Preserve status filtering. Add tests and run checks. Do not fix validation or mobile layout. Stop before committing.'
discobox run -d --name 'C - mobile layout' . 'Make ClipShelf usable at 375px without horizontal overflow. Keep all controls reachable and preserve the desktop visual design. Check dialogs, forms, cards, and status filters. Do not change validation or add search. Run existing checks and report visual verification. Stop before committing.'
discobox ls
```

Review each result, commit accepted work on separate branches, then integrate in the order A → B → C. Check the combined app: mobile search, no-results messages, and validation errors. Isolation prevents shared working-directory edits; it does not guarantee conflict-free integration.

The baseline mobile issue is real CSS overflow: `.workspace` has a 620px minimum shelf plus a 290px sidebar; header/overview/footer have desktop minimum widths; the hero and filters don't adapt. Fixing only `overflow-x: hidden` would conceal controls and does not meet the task.

No browser automation dependency is bundled. The agent can use available browser tooling, or you can verify the actual viewport manually. Don't present jsdom tests as proof of responsive layout.

## Episode 4: API key without seeing it

ClipShelf is not involved in authentication. Use the separate disposable private repository and credential setup from the script. Don't add credentials or a backend to this app just for that episode. The ordinary app can remain open as contextual footage.

## Episode 5: Uncertain refactor

Start again from `recording-baseline`. Read [DATE-CONTRACT.md](DATE-CONTRACT.md), run `npm run test:dates`, and capture the two helpers and their card call sites.

```sh
discobox run . 'Investigate replacing date-fns in src/lib/dates.ts with built-in APIs. Preserve docs/DATE-CONTRACT.md, every characterization test, and the existing UI. Run npm run test:dates and the project checks. Explain maintenance tradeoffs; keeping the dependency is acceptable. Do not rewrite test expectations, add dependencies, or fix unrelated exercises. Stop before committing.'
```

Be candid that this app was built for the video and the dependency was selected to give you a real refactor exercise. The agent still has a real decision to make about parsing, local calendar dates, and maintenance cost. There is no prewritten replacement implementation hidden in the repo.

## Episode 6: Workflow verdict

Collect your real outcomes from the earlier episodes. The app doesn't generate benchmark numbers or pretend an agent succeeded. Compare complete, reviewed work and include your intervention time.

## Reset without losing previous episodes

Use a new branch name for each take, from `recording-baseline`. Existing episode branches preserve their commits. If you need a separate folder, clone your local repository and start a new branch from the tag. Neither operation resets browser data; use the in-app reset separately.

The sample reset changes only localStorage, not source files or Git. A Git branch switch changes source, not localStorage. This distinction is especially useful when recording before/after states.
