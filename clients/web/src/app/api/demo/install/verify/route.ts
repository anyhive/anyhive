import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Simulate verification delay and always succeed in demo mode
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const body = await request.json().catch(() => ({} as any))
  const installToken = body?.installToken as string | undefined

  return NextResponse.json({ status: "verified", installToken })
}



