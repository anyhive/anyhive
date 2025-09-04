"use client"

import { usePathname } from "next/navigation"

interface Step {
  id: string
  title: string
  description: string
}

interface OnboardingProgressProps {
  steps: Step[]
}

export function OnboardingProgress({ steps }: OnboardingProgressProps) {
  const pathname = usePathname()
  
  const getCurrentStepId = (): string => {
    if (pathname.includes("welcome")) return "welcome"
    if (pathname.includes("organization")) return "organization"
    if (pathname.includes("contact")) return "contact"
    if (pathname.includes("business")) return "business"
    if (pathname.includes("payment")) return "payment"
    if (pathname.includes("integration")) return "integration"
    if (pathname.includes("review")) return "review"
    if (pathname.includes("complete")) return "complete"
    
    return "welcome"
  }
  
  const currentStepId = getCurrentStepId()

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId)
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    
    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "upcoming"
  }

  const getStepCircleClasses = (stepId: string) => {
    const baseClasses = "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
    const status = getStepStatus(stepId)
    
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-500 text-white`
      case "current":
        return `${baseClasses} bg-blue-500 text-white`
      default:
        return `${baseClasses} bg-gray-600 text-gray-400`
    }
  }

  const getStepTitleClasses = (stepId: string) => {
    const baseClasses = "text-sm"
    return stepId === currentStepId 
      ? `${baseClasses} text-white font-medium`
      : `${baseClasses} text-gray-400`
  }

  const isWelcomeStep = currentStepId === "welcome"
  
  if (isWelcomeStep) {
    return (
      <div className="flex flex-col gap-y-2">
        <div className="inline-flex items-center text-blue-400 text-xs font-medium">
          Getting Started
        </div>
        <h2 className="text-3xl font-bold text-white">
          Welcome to Anyhive
        </h2>
        <p className="text-gray-500 text-sm">
          Let's set up your payment infrastructure and get you started
        </p>
      </div>
    )
  }

  const progressSteps = steps.filter(step => step.id !== "welcome")

  return (
    <nav aria-label="Progress">
      <ol className="space-y-0">
        {progressSteps.map((step, index) => (
          <li key={step.id} className="relative">
            <div className="flex items-start space-x-3 pb-6">
              <div className="flex-shrink-0 relative pt-0.5 self-stretch">
                <div className={`${getStepCircleClasses(step.id)} transition-all duration-300 ease-in-out`}>
                  {getStepStatus(step.id) === "completed" ? (
                    <svg className="w-2.5 h-2.5 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : null}
                </div>

                {index < progressSteps.length - 1 && (
                  <div className="absolute top-6 left-2 h-[calc(100%-0.5rem)] w-0 border-l border-dashed border-gray-800 transition-opacity duration-300" />
                )}
              </div>

              <div className="flex-1 transition-colors duration-300">
                <h3 className={`${getStepTitleClasses(step.id)} transition-colors duration-300`}>
                  {step.title}
                </h3>
                <p className="text-xs mt-1 text-gray-500 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}