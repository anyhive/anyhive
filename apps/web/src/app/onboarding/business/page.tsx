"use client"

import { Button } from "@anyhive/ui/components/button"
import { Input } from "@anyhive/ui/components/input"
import { Label } from "@anyhive/ui/components/label"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BusinessPage() {
  const router = useRouter()
  const { formData, updateBusiness } = useOnboarding()
  const [formState, setFormState] = useState(formData.business)

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formState, [field]: value }
    setFormState(newData)
    updateBusiness(newData)
  }

  const handleNext = () => {
    router.push('/onboarding/payment')
  }

  const handleBack = () => {
    router.push('/onboarding/contact')
  }

  const isFormValid = formState.industry && formState.size && formState.monthlyVolume

  return (
    <StepLayout
      stepNumber={3}
      stepTitle="Business Details"
      stepDescription="Help us understand your business requirements"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <select
              id="industry"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              required
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="ecommerce">E-commerce</option>
              <option value="retail">Retail</option>
              <option value="healthcare">Healthcare</option>
              <option value="financial-services">Financial Services</option>
              <option value="education">Education</option>
              <option value="travel">Travel & Hospitality</option>
              <option value="media">Media & Entertainment</option>
              <option value="food-beverage">Food & Beverage</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Company Size *</Label>
            <select
              id="size"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              required
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1,000 employees</option>
              <option value="1000+">1,000+ employees</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyVolume">Expected Monthly Transaction Volume *</Label>
          <select
            id="monthlyVolume"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formState.monthlyVolume}
            onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
            required
          >
            <option value="">Select monthly volume</option>
            <option value="0-1k">$0 - $1,000</option>
            <option value="1k-10k">$1,000 - $10,000</option>
            <option value="10k-50k">$10,000 - $50,000</option>
            <option value="50k-250k">$50,000 - $250,000</option>
            <option value="250k-1m">$250,000 - $1,000,000</option>
            <option value="1m+">$1,000,000+</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={formState.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Business Address</h3>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter street address"
              value={formState.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter city"
                value={formState.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="Enter ZIP code"
                value={formState.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
              />
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
