"use client"

import { OnboardingProgress } from "@/components/onboarding/progress"
import { OnboardingProvider } from "@/contexts/onboarding-context"

const onboardingSteps = [
  {
    id: "welcome",
    title: "Welcome",
    description: "Get started with Anyhive"
  },
  {
    id: "organization",
    title: "Organization",
    description: "Tell us about your organization"
  },
  {
    id: "contact",
    title: "Contact Info",
    description: "Primary contact information"
  },
  {
    id: "business",
    title: "Business Details",
    description: "Business information and requirements"
  },
  {
    id: "payment",
    title: "Payment Setup",
    description: "Configure payment preferences"
  },
  {
    id: "integration",
    title: "Integration",
    description: "Platform integration settings"
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Review and confirm your setup"
  },
  {
    id: "complete",
    title: "Setup Complete",
    description: "Welcome to Anyhive!"
  }
]

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gray-900 flex justify-center p-2 md:items-stretch">
        <div className="hidden md:flex w-0 md:w-48 lg:w-1/5 xl:w-[280px] flex-col justify-between mx-auto md:mx-10 my-6 text-white">
          <div className="flex flex-col gap-y-12 h-full">
            <div className="mb-8">
              <div className="inline-flex items-center text-gray-200 font-medium gap-x-1">
                <span className="text-2xl font-bold">Anyhive</span>
                <span className="text-gray-300 text-xs font-normal">
                  Payment Infrastructure
                </span>
              </div>
            </div>

            <OnboardingProgress steps={onboardingSteps} />
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
    </OnboardingProvider>
  )
}