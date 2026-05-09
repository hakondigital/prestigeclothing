import { NextResponse } from 'next/server';

export const runtime = 'edge';

function isValidEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  // Stubbed: log only. In production, forward to Klaviyo / Shopify Customers API / Mailchimp / etc.
  // eslint-disable-next-line no-console
  console.log('[prestige:newsletter]', body.email);

  return NextResponse.json({ ok: true });
}
