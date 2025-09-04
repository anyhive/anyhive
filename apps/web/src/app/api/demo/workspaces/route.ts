import { NextResponse } from "next/server"

function randomId(prefix: string) {
  const part = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${part}`
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as any))
  const name = (body?.name as string) || "demo-workspace"

  const workspace = {
    workspaceId: randomId("ws"),
    name,
    apiKey: randomId("pk"),
    installToken: randomId("it"),
  }

  return NextResponse.json(workspace)
}



