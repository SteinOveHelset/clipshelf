# Date-display contract

The refactor question is intentionally narrow: can the two helpers in `src/lib/dates.ts` be implemented more simply with native APIs while keeping the current outputs?

`date-fns` is present solely for these helpers. `IdeaCard` uses `formatIdeaDate` for the visible label and `formatIdeaDateTime` for the date's hover tooltip. Sample ideas use ISO calendar dates; newly added ideas use ISO UTC timestamps.

## Supported behavior

- English abbreviated month, unpadded day, four-digit year: `Nov 18, 2026`.
- Timestamp labels add ` · h:mm AM/PM`, using a 12-hour clock and two-digit minutes.
- A date-only ISO value is a **local calendar date**. `2026-11-18` remains November 18 in all three tested zones.
- An ISO datetime without an offset is interpreted in local time.
- A timestamp containing `Z` or an offset is an instant, displayed in the viewer's local timezone.
- Invalid input returns `Unknown date` from both helpers. This includes impossible dates such as February 30.
- The output is English even if the user's browser locale is different.

The contract covers the ISO forms the app uses and the characterization cases; it is not a demand to support arbitrary human-entered date formats.

## Matrix

```sh
npm run test:dates
```

The script runs the same characterization tests with `TZ=UTC`, `TZ=Europe/Madrid`, and `TZ=America/Los_Angeles` in separate processes. It covers local date-only inputs, local datetimes, real leap dates, invalid dates, and timestamps near a day boundary.

For example, `2026-11-18T00:30:00Z` is November 18 in UTC/Madrid but November 17 in Los Angeles. `new Date('2026-11-18')` and a local date parser do not have equivalent semantics everywhere; a replacement must account for this.

## Review criteria

1. Run the matrix on the original code before refactoring.
2. Inspect all imports/call sites; remove the dependency only if truly unused afterward.
3. Run the same tests and inspect the app after the change.
4. Evaluate readability and the custom parsing logic you would now own.
5. If you compare production bundle size, compare the same emitted app JavaScript with the same compression method before and after. The stylesheet/font assets are unchanged by this task. Fewer packages alone doesn't establish a performance improvement.

This dependency was deliberately chosen as the recording fixture's refactor exercise. In the video, describe it as an experiment on a demo app—not as a library discovered in a pre-existing production application.
