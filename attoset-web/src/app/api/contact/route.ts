import { NextResponse } from "next/server";
import { COLUMNS, EMAIL_RE, TEAM_SIZES, clean, submitLead } from "@/lib/attoset-leads";

/** Contact page → a record in the Attoset "Leads" table. */

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  teamSize?: string;
  message?: string;
  website?: string; // honeypot: real visitors never fill this
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Bots fill every field; pretend it worked and drop it.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = `${clean(body.firstName, 80)} ${clean(body.lastName, 80)}`.trim();
  const email = clean(body.email, 254);
  const company = clean(body.company, 120);
  if (!name || !EMAIL_RE.test(email) || !company) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const values: [string, unknown][] = [
    [COLUMNS.name, name],
    [COLUMNS.email, email],
    [COLUMNS.company, company],
    [COLUMNS.jobTitle, clean(body.jobTitle, 120) || null],
    [COLUMNS.message, clean(body.message, 5000) || null],
  ];
  const teamSizeId = TEAM_SIZES[clean(body.teamSize, 20)];
  if (teamSizeId) values.push([COLUMNS.teamSize, teamSizeId]);

  try {
    await submitLead(values);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submit to Attoset failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
