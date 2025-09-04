import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    user: {
      id: "user_demo_123",
      email: "demo@anyhive.app",
      name: "Demo User",
    },
    workspaces: [
      { id: "ws_demo_1", name: "demo-workspace" },
    ],
  })
}



