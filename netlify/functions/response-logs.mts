import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

const store = getStore({ name: 'response-logs', consistency: 'strong' })

export default async (req: Request) => {
  if (req.method !== 'GET') {
    return Response.json(
      { error: 'Method not allowed. Use GET.' },
      { status: 405 },
    )
  }

  const url = new URL(req.url)
  const limitParam = Number(url.searchParams.get('limit') ?? '25')
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(Math.floor(limitParam), 1), 100)
    : 25

  const { blobs } = await store.list()
  const keys = blobs
    .map((blob) => blob.key)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, limit)

  const logs = await Promise.all(
    keys.map((key) => store.get(key, { type: 'json' })),
  )

  return Response.json({
    count: logs.length,
    logs,
  })
}

export const config: Config = {
  path: '/api/response-logs',
}
