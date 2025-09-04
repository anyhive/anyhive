"use client"

import { Button } from "@anyhive/ui/components/button"
import { Input } from "@anyhive/ui/components/input"
import { Label } from "@anyhive/ui/components/label"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function OrganizationPage() {
  const router = useRouter()
  const { formData, updateOrganization } = useOnboarding()
  const [formState, setFormState] = useState(formData.organization)

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formState, [field]: value }
    setFormState(newData)
    updateOrganization(newData)
  }

  const handleNext = () => {
    router.push('/onboarding/contact')
  }

  const handleBack = () => {
    router.push('/onboarding/welcome')
  }

  return (
    <StepLayout
      stepNumber={1}
      stepTitle="Tell us about your organization"
      stepDescription="We'll use this information to customize your payment setup"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your organization name"
              value={formState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Organization Type *</Label>
            <select
              id="type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              required
            >
              <option value="">Select organization type</option>
              <option value="startup">Startup</option>
              <option value="small-business">Small Business</option>
              <option value="enterprise">Enterprise</option>
              <option value="non-profit">Non-profit</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS Platform</option>
              <option value="marketplace">Marketplace</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Brief Description</Label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us what your organization does..."
              rows={4}
              value={formState.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <p className="text-sm text-gray-500">
              This helps us understand your business and recommend the best payment solutions.
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleBack}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!formState.name || !formState.type}
          >
            Continue
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}
