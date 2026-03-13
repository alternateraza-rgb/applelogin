import { getStore } from '@netlify/blobs'
import type { Config, Context } from '@netlify/functions'

type ResponseLog = {
  id: string
  timestamp: string
  method: string
  path: string
  status: number
  requestId: string
  responseBody: unknown
}

const store = getStore({ name: 'response-logs', consistency: 'strong' })

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed. Use POST.' },
      { status: 405 },
    )
  }

  let body: { status?: number; responseBody?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    return Response.json(
      {
        error:
          'Invalid JSON body. Send {"status": number, "responseBody": any}.',
      },
      { status: 400 },
    )
  }

  const url = new URL(req.url)
  const now = new Date().toISOString()
  const id = `${Date.now()}-${context.requestId}`
  const entry: ResponseLog = {
    id,
    timestamp: now,
    method: req.method,
    path: url.pathname,
    status: body.status ?? 200,
    requestId: context.requestId,
    responseBody: body.responseBody ?? null,
  }

  await store.setJSON(id, entry)

  return Response.json({
    ok: true,
    message: 'Response log saved.',
    id,
  })
}

export const config: Config = {
  path: '/api/response-logger',
}
