"use client"

import { ReactNode } from "react"

interface StepLayoutProps {
  stepNumber?: number
  stepTitle?: string
  stepDescription?: string
  showStepHeader?: boolean
  children: ReactNode
  className?: string
}

export function StepLayout({
  stepNumber,
  stepTitle,
  stepDescription,
  showStepHeader = true,
  children,
  className = ""
}: StepLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {showStepHeader && (stepTitle || stepNumber) && (
        <div className="mb-8">
          <div className="flex flex-col gap-y-2 mb-6">
            {stepNumber && (
              <div className="animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {stepNumber}
                </div>
              </div>
            )}
            {stepTitle && (
              <div className="animate-slide-up">
                <h1 className="text-xl text-gray-900">
                  {stepTitle}
                </h1>
                {stepDescription && (
                  <span className="text-gray-400 text-sm">
                    {stepDescription}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`${className}`}>
        {children}
      </div>
    </div>
  )
}