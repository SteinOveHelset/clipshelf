// @vitest-environment node
import { describe, expect, it } from "vitest";
import { formatIdeaDate, formatIdeaDateTime } from "./dates";

describe("date-display contract", () => {
  it("keeps a date-only value on its local calendar day", () => {
    expect(formatIdeaDate("2026-11-18")).toBe("Nov 18, 2026");
    expect(formatIdeaDateTime("2026-11-18")).toBe("Nov 18, 2026 · 12:00 AM");
  });

  it("supports a real leap day", () => {
    expect(formatIdeaDate("2024-02-29")).toBe("Feb 29, 2024");
  });

  it.each(["", "not-a-date", "2026-02-30", "2026-13-01"])(
    "has a stable invalid-input fallback for %j",
    (value) => {
      expect(formatIdeaDate(value)).toBe("Unknown date");
      expect(formatIdeaDateTime(value)).toBe("Unknown date");
    },
  );

  it("uses English labels regardless of browser locale", () => {
    expect(formatIdeaDate("2026-08-03")).toBe("Aug 3, 2026");
  });

  it("treats a local datetime as local time", () => {
    expect(formatIdeaDateTime("2026-11-18T09:05:00")).toBe(
      "Nov 18, 2026 · 9:05 AM",
    );
  });

  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cases: Record<string, [string, string, string, string]> = {
    UTC: [
      "Nov 18, 2026",
      "Nov 18, 2026 · 12:30 AM",
      "Nov 17, 2026",
      "Nov 17, 2026 · 10:30 PM",
    ],
    "Europe/Madrid": [
      "Nov 18, 2026",
      "Nov 18, 2026 · 1:30 AM",
      "Nov 17, 2026",
      "Nov 17, 2026 · 11:30 PM",
    ],
    "America/Los_Angeles": [
      "Nov 17, 2026",
      "Nov 17, 2026 · 4:30 PM",
      "Nov 17, 2026",
      "Nov 17, 2026 · 2:30 PM",
    ],
  };
  const expected = cases[zone];

  // The dedicated matrix script always exercises all three explicit zones.
  it.skipIf(!expected)(`renders a UTC instant near midnight in ${zone}`, () => {
    expect(formatIdeaDate("2026-11-18T00:30:00Z")).toBe(expected[0]);
    expect(formatIdeaDateTime("2026-11-18T00:30:00Z")).toBe(expected[1]);
  });

  it.skipIf(!expected)(`honors an explicit offset in ${zone}`, () => {
    expect(formatIdeaDate("2026-11-18T00:30:00+02:00")).toBe(expected[2]);
    expect(formatIdeaDateTime("2026-11-18T00:30:00+02:00")).toBe(expected[3]);
  });
});
