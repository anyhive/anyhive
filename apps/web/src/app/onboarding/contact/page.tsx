"use client"

import { Button } from "@anyhive-kit/ui/components/button"
import { Input } from "@anyhive-kit/ui/components/input"
import { Label } from "@anyhive-kit/ui/components/label"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const { formData, updateContact } = useOnboarding()
  const [formState, setFormState] = useState(formData.contact)

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formState, [field]: value }
    setFormState(newData)
    updateContact(newData)
  }

  const handleNext = () => {
    router.push('/onboarding/business')
  }

  const handleBack = () => {
    router.push('/onboarding/organization')
  }

  const isFormValid = formState.firstName && formState.lastName && formState.email && formState.phone

  return (
    <StepLayout
      stepNumber={2}
      stepTitle="Contact Information"
      stepDescription="Primary contact person for this account"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={formState.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={formState.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter business email"
            value={formState.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={formState.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position/Title</Label>
          <Input
            id="position"
            type="text"
            placeholder="e.g., CEO, CTO, Finance Manager"
            value={formState.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">Important Notice</h4>
              <p className="text-sm text-blue-700 mt-1">
                This contact will receive important notifications about your account, including security alerts and payment confirmations.
              </p>
            </div>
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
            disabled={!isFormValid}
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