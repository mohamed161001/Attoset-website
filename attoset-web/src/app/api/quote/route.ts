import { NextResponse } from "next/server";
import { COLUMNS, EMAIL_RE, clean, submitLead } from "@/lib/attoset-leads";

/**
 * Pricing quote box → a record in the Attoset "Leads" table.
 *
 * The box only asks for an email, so the email also fills Full Name and the
 * configured quote goes into Message.
 */

type Body = {
  email?: string;
  summary?: unknown;
  website?: string; // honeypot: real visitors never fill this
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 254);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const summary = Array.isArray(body.summary)
    ? body.summary.slice(0, 20).map((line) => clean(line, 300)).filter(Boolean)
    : [];
  const message = ["Official quote request from the pricing page", "", ...summary].join("\n");

  try {
    await submitLead([
      [COLUMNS.name, email],
      [COLUMNS.email, email],
      [COLUMNS.message, message.slice(0, 5000)],
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] submit to Attoset failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
