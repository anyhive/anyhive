"use client"

import { useRouter } from "next/navigation"
import { StepLayout } from "@/components/onboarding/step-layout"
import { Button } from "@anyhive/ui/components/button"

export default function QuickstartCompletePage() {
  const router = useRouter()

  return (
    <StepLayout stepTitle="All set!" stepDescription="Your demo environment is ready.">
      <div className="flex flex-col gap-y-6 items-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Quickstart Completed</h2>
        <p className="text-gray-600 max-w-md">You're ready to explore the product. You can revisit onboarding anytime for full setup.</p>

        <div className="flex gap-x-3 mt-2">
          <Button variant="default" onClick={() => router.push("/")}>Go to Dashboard</Button>
          <Button variant="secondary" onClick={() => router.push("/quickstart/welcome")}>Run again</Button>
        </div>
      </div>
    </StepLayout>
  )
}



