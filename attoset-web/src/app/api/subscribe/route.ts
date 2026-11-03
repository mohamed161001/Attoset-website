import { NextResponse } from "next/server";

/**
 * Adds an email to the Zoho Campaigns "product updates" mailing list.
 *
 * Needs these environment variables (set them in Vercel → Settings →
 * Environment Variables, never in the repo):
 *   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
 *     — from a Zoho API console "Self Client" with scope ZohoCampaigns.contact.CREATE
 *   ZOHO_CAMPAIGNS_LIST_KEY — the list's key (Zoho Campaigns → Contacts → list → Setup)
 *   ZOHO_DC — optional data-centre domain: "com" (default), "eu", "in", "com.au", "ca"…
 *
 * Until they are set the route answers 503 and the form tells the visitor so.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function accessToken(dc: string) {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token?${params}`, {
    method: "POST",
    cache: "no-store",
  });
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Zoho token refresh failed");
  return data.access_token;
}

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const listKey = process.env.ZOHO_CAMPAIGNS_LIST_KEY;
  if (
    !listKey ||
    !process.env.ZOHO_CLIENT_ID ||
    !process.env.ZOHO_CLIENT_SECRET ||
    !process.env.ZOHO_REFRESH_TOKEN
  ) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const dc = process.env.ZOHO_DC || "com";

  try {
    const token = await accessToken(dc);
    const params = new URLSearchParams({
      resfmt: "JSON",
      listkey: listKey,
      source: "attoset.com/updates",
      contactinfo: JSON.stringify({ "Contact Email": email }),
    });
    const res = await fetch(
      `https://campaigns.zoho.${dc}/api/v1.1/json/listsubscribe?${params}`,
      {
        method: "POST",
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
        cache: "no-store",
      }
    );
    const data = (await res.json()) as { status?: string };
    if (data.status !== "success") throw new Error("Zoho subscribe failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
