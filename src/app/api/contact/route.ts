import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || 'sureshkumar27082002@gmail.com'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: Request) {
  try {
    let body: any

    try {
      const rawText = await req.text()
      body = JSON.parse(rawText)
    } catch (parseErr) {
      console.warn('⚠️ Bad JSON received in /api/contact:', parseErr)
      return NextResponse.json(
        { error: 'Invalid JSON body format.' },
        { status: 400 }
      )
    }

    const { name, email, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn(
        '⚠️ RESEND_API_KEY is not set. Email notification skipped, but message was saved to Supabase.'
      )
      return NextResponse.json({
        success: true,
        notification: 'skipped_no_api_key',
      })
    }

    const resend = new Resend(apiKey)

    const cleanName = escapeHtml(String(name).trim())
    const cleanEmail = escapeHtml(String(email).trim())
    const cleanMessage = escapeHtml(String(message).trim())

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d0d0d; color: #f5f5f5; padding: 24px; }
            .card { background-color: #161616; border: 1px solid #2a2a2a; border-radius: 20px; max-width: 580px; margin: 0 auto; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #1f1f1f 0%, #111111 100%); padding: 24px 30px; border-bottom: 1px solid #2a2a2a; }
            .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
            .header p { margin: 4px 0 0; font-size: 13px; color: #a1a1aa; }
            .body { padding: 28px 30px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8e8e8e; margin-bottom: 6px; }
            .value { font-size: 15px; color: #f5f5f5; font-weight: 500; }
            .message-box { background-color: #0d0d0d; border: 1px solid #262626; border-radius: 12px; padding: 16px 20px; font-size: 14.5px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; margin-top: 6px; }
            .footer { padding: 18px 30px; background-color: #111111; border-top: 1px solid #222222; text-align: center; }
            .btn { display: inline-block; background-color: #ffffff; color: #000000; font-weight: 600; font-size: 13px; padding: 10px 22px; border-radius: 999px; text-decoration: none; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>📬 New Portfolio Inquiry</h2>
              <p>Someone reached out through your website contact form.</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${cleanName}</div>
              </div>
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: none;">${cleanEmail}</a></div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${cleanMessage}</div>
              </div>
            </div>
            <div class="footer">
              <a href="mailto:${cleanEmail}?subject=Re: Your inquiry on Sureshkumar's Portfolio" class="btn">
                Reply Directly to ${cleanName} ↗
              </a>
            </div>
          </div>
        </body>
      </html>
    `

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: NOTIFICATION_EMAIL,
      replyTo: String(email).trim(),
      subject: `✨ New Message from ${cleanName} via Portfolio`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error sending email notification:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to send email notification' },
      { status: 500 }
    )
  }
}
