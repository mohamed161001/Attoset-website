import { NextResponse } from "next/server";

/**
 * Contact page → Attoset.
 *
 * Every message becomes a record in the "Leads" table
 * (workspace "Attoset - Website") by submitting the public Attoset form
 * "Website Contact Form". The form fills Source = Website and Status = New
 * on its own, so neither is sent from here.
 *
 * If a column is renamed in Attoset nothing breaks (ids are used), but if a
 * question is removed from the form or the form is set to inactive, this route
 * answers 502 and the page tells the visitor to email us instead.
 */

const ATTOSET_API = "https://dev.attoset.com";
const FORM_ID = "428ba179-7618-4e9c-81c3-2f8dba5858ce";

const COLUMNS = {
  name: "214441b4-e543-4259-a6d9-1333b6425d86",
  email: "3813f7ee-a85e-4145-9511-c519eea7adab",
  company: "f7d89406-3730-43a6-8fc3-1e78be75d6cc",
  jobTitle: "1d5900e8-633c-4f24-a894-78e812a02123",
  teamSize: "03da63f7-9784-4edd-a95c-60bed02cf948",
  segment: "d0cd44ea-d727-46c0-9570-59c8ce272a29",
  message: "6ec0925d-e8c4-4b0f-8267-ac8e8860578d",
} as const;

/** Team-size label → its select option id in Attoset. */
const TEAM_SIZES: Record<string, string> = {
  "1–10": "ea382000-9283-47cb-9235-d58be4362fb9",
  "11–50": "e0877d57-c93f-4582-81ef-52eb9cdf8b62",
  "51–200": "a01d3640-9041-4005-97d3-654b0a8fc1c3",
  "200+": "403e025d-e287-4518-a848-2000dc52a87e",
};

/** Segment ("I'm interested in") → its select option id in Attoset. */
const SEGMENTS: Record<string, string> = {
  Direct: "491f4d8c-3bc8-47e4-9c2a-3fc3d881af44",
  Partner: "08a0e8a0-c735-4e6b-afff-8f9679b3ee72",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  teamSize?: string;
  segment?: string;
  message?: string;
  website?: string; // honeypot: real visitors never fill this
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Bots fill every field; pretend it worked and drop it.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = `${clean(body.firstName, 80)} ${clean(body.lastName, 80)}`.trim();
  const email = clean(body.email, 254);
  const company = clean(body.company, 120);
  const segmentId = SEGMENTS[clean(body.segment, 20)];
  if (!name || !EMAIL_RE.test(email) || !company || !segmentId) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const values: [string, unknown][] = [
    [COLUMNS.name, name],
    [COLUMNS.email, email],
    [COLUMNS.company, company],
    [COLUMNS.jobTitle, clean(body.jobTitle, 120) || null],
    [COLUMNS.segment, segmentId],
    [COLUMNS.message, clean(body.message, 5000) || null],
  ];
  const teamSizeId = TEAM_SIZES[clean(body.teamSize, 20)];
  if (teamSizeId) values.push([COLUMNS.teamSize, teamSizeId]);

  const responses = values
    .filter(([, value]) => value !== null)
    .map(([id, value]) => ({ fieldId: id, columnId: id, fieldType: "BASE_COLUMN", value }));

  try {
    const res = await fetch(`${ATTOSET_API}/api/v1/forms/${FORM_ID}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: FORM_ID, responses, uploads: [] }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Attoset answered ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submit to Attoset failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
