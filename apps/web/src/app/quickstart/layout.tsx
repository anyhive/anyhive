"use client"

import { OnboardingProgress } from "@/components/onboarding/progress"

const quickstartSteps = [
  {
    id: "welcome",
    title: "Quickstart",
    description: "Get started with Anyhive demo"
  },
  {
    id: "complete",
    title: "Done",
    description: "You're ready to explore"
  }
]

export default function QuickstartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center p-2 md:items-stretch">
      <div className="fixed top-3 right-3 z-50">
        <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs">
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 12.25h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-5h1.5v5z"/></svg>
          Demo Mode
        </span>
      </div>
      <div className="hidden md:flex w-0 md:w-48 lg:w-1/5 xl:w-[280px] flex-col justify-between mx-auto md:mx-10 my-6 text-white">
        <div className="flex flex-col gap-y-12 h-full">
          <div className="mb-8">
            <div className="inline-flex items-center text-gray-200 font-medium gap-x-1">
              <span className="text-2xl font-bold">Anyhive</span>
              <span className="text-gray-300 text-xs font-normal">
                Quickstart Demo
              </span>
            </div>
          </div>

          <OnboardingProgress steps={quickstartSteps} />
        </div>

        <div className="flex flex-col items-center mt-auto gap-y-1">
          <ul className="flex items-center w-full gap-x-4 text-sm text-gray-500 font-light">
            <li>
              <a href="#" className="hover:text-gray-400">Terms</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">Privacy</a>
            </li>
          </ul>
          <span className="text-gray-600 text-xs font-normal self-start">
            &copy; {new Date().getFullYear()} Anyhive. All rights reserved.
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl">
        <div className="flex-1 flex w-full items-center justify-center [&>*]:w-full px-20 py-12">
          {children}
        </div>
      </div>
    </div>
  )
}


