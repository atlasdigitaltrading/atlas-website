import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_EMAIL_RECIPIENT;

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email not configured. Set RESEND_API_KEY and DEMO_EMAIL_RECIPIENT on the server.",
      },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const role = String(body.role ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.DEMO_EMAIL_FROM ??
      "Atlas Demo Request <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Demo Request: ${firstName} ${lastName} — ${company || "No company"}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Role:</strong> ${role || "Not provided"}</p>
        <p><strong>Message:</strong> ${message || "None"}</p>
        <hr />
        <p><em>Submitted via atlasdigitaltrading.com</em></p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
