"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { StepLayout } from "@/components/onboarding/step-layout"
import { Input } from "@anyhive/ui/components/input"
import { Label } from "@anyhive/ui/components/label"
import { Button } from "@anyhive/ui/components/button"

type CreateWorkspaceResponse = {
  workspaceId: string
  name: string
  apiKey: string
  installToken: string
}

function generateRandomWorkspaceName(): string {
  const adjectives = [
    "swift",
    "brave",
    "lively",
    "calm",
    "bright",
    "eager",
    "merry",
    "noble",
    "rapid",
    "vivid",
  ]
  const animals = [
    "otter",
    "falcon",
    "lynx",
    "orca",
    "panda",
    "tiger",
    "koala",
    "eagle",
    "bison",
    "fox",
  ]
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const number = Math.floor(1000 + Math.random() * 9000)
  return `${adjective}-${animal}-${number}`
}

export default function QuickstartWelcomePage() {
  const router = useRouter()
  const [workspaceName, setWorkspaceName] = useState<string>("")
  const [creating, setCreating] = useState<boolean>(false)
  const [copying, setCopying] = useState<boolean>(false)
  const [verifying, setVerifying] = useState<boolean>(false)
  const [ws, setWs] = useState<CreateWorkspaceResponse | null>(null)

  const defaultName = useMemo(() => generateRandomWorkspaceName(), [])

  useEffect(() => {
    setWorkspaceName(defaultName)
  }, [defaultName])

  useEffect(() => {
    // Create a demo workspace immediately to render the install command
    const bootstrap = async () => {
      setCreating(true)
      try {
        const res = await fetch("/api/demo/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: workspaceName || defaultName }),
        })
        const data: CreateWorkspaceResponse = await res.json()
        setWs(data)
      } finally {
        setCreating(false)
      }
    }
    bootstrap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const command = ws
    ? `npx anyhive-cli@latest init --workspace ${ws.workspaceId} --token ${ws.installToken}`
    : ""

  const handleCopy = async () => {
    if (!command) return
    try {
      setCopying(true)
      await navigator.clipboard.writeText(command)
    } finally {
      setTimeout(() => setCopying(false), 800)
    }
  }

  const handleVerify = async () => {
    if (!ws) return
    setVerifying(true)
    try {
      await fetch("/api/demo/install/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ installToken: ws.installToken }),
      })
      router.push("/")
    } finally {
      setVerifying(false)
    }
  }

  const handleNameBlur = async () => {
    if (!workspaceName || workspaceName === ws?.name) return
    setCreating(true)
    try {
      const res = await fetch("/api/demo/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: workspaceName }),
      })
      const data: CreateWorkspaceResponse = await res.json()
      setWs(data)
    } finally {
      setCreating(false)
    }
  }

  return (
    <StepLayout showStepHeader={false}>
      <div className="flex flex-col gap-y-6">
        <div className="flex">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Quickstart Demo
        </h2>

        <div className="text-gray-600 leading-relaxed">
          <p>Use the default workspace name or customize it, then copy and run the command. Click "I have completed installation" to continue.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label htmlFor="workspaceName">Workspace name</Label>
            <div className="mt-2 flex items-center gap-x-3">
              <Input
                id="workspaceName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onBlur={handleNameBlur}
                placeholder="my-workspace"
              />
              <Button
                type="button"
                variant="secondary"
                disabled={creating}
                onClick={handleNameBlur}
              >
                {creating ? "Updating..." : "Use name"}
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Run this command</span>
              <Button type="button" size="sm" onClick={handleCopy} disabled={!command}>
                {copying ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="mt-3 text-sm bg-black text-white rounded-md p-3 overflow-auto">
{command}
            </pre>
          </div>
        </div>

        <div className="flex justify-center py-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <Button
            variant="default"
            size="lg"
            className="px-8"
            onClick={handleVerify}
            disabled={!ws || verifying}
          >
            {verifying ? "Verifying..." : "I have completed installation"}
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}


