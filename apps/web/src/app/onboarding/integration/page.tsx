"use client"

import { Button } from "@anyhive-kit/ui/components/button"
import { Input } from "@anyhive-kit/ui/components/input"
import { Label } from "@anyhive-kit/ui/components/label"
import { Checkbox } from "@anyhive-kit/ui/components/checkbox"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function IntegrationPage() {
  const router = useRouter()
  const { formData, updateIntegration } = useOnboarding()
  const [formState, setFormState] = useState(formData.integration)

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = formState.platforms.includes(platform)
      ? formState.platforms.filter(p => p !== platform)
      : [...formState.platforms, platform]
    
    const newData = { ...formState, platforms: newPlatforms }
    setFormState(newData)
    updateIntegration(newData)
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    const newData = { ...formState, [field]: checked }
    setFormState(newData)
    updateIntegration(newData)
  }

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formState, [field]: value }
    setFormState(newData)
    updateIntegration(newData)
  }

  const handleNext = () => {
    router.push('/onboarding/review')
  }

  const handleBack = () => {
    router.push('/onboarding/payment')
  }

  const platforms = [
    { id: 'shopify', name: 'Shopify', description: 'E-commerce platform' },
    { id: 'woocommerce', name: 'WooCommerce', description: 'WordPress plugin' },
    { id: 'magento', name: 'Magento', description: 'Adobe Commerce' },
    { id: 'bigcommerce', name: 'BigCommerce', description: 'SaaS e-commerce' },
    { id: 'stripe', name: 'Stripe', description: 'Payment processor migration' },
    { id: 'square', name: 'Square', description: 'POS and payments' },
    { id: 'custom', name: 'Custom Integration', description: 'API-based solution' },
    { id: 'other', name: 'Other', description: 'Tell us what you need' }
  ]

  return (
    <StepLayout
      stepNumber={5}
      stepTitle="Integration Setup"
      stepDescription="How do you plan to integrate with Anyhive?"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Platform Integrations</h3>
          <p className="text-sm text-gray-600">Select the platforms you'd like to integrate with (optional)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formState.platforms.includes(platform.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                <Checkbox 
                  checked={formState.platforms.includes(platform.id)}
                  onChange={() => handlePlatformToggle(platform.id)}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{platform.name}</div>
                  <div className="text-xs text-gray-500">{platform.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Technical Requirements</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="apiUsage"
                checked={formState.apiUsage}
                onCheckedChange={(checked) => handleCheckboxChange('apiUsage', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="apiUsage" className="text-sm font-medium">I will use Anyhive's REST API</Label>
                <p className="text-xs text-gray-500">Direct API integration for custom applications</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                id="webhooks"
                checked={formState.webhooks}
                onCheckedChange={(checked) => handleCheckboxChange('webhooks', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="webhooks" className="text-sm font-medium">I need webhook notifications</Label>
                <p className="text-xs text-gray-500">Real-time payment status updates</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                id="customIntegration"
                checked={formState.customIntegration}
                onCheckedChange={(checked) => handleCheckboxChange('customIntegration', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="customIntegration" className="text-sm font-medium">I need custom integration support</Label>
                <p className="text-xs text-gray-500">Assistance from our integration team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="technicalContact">Technical Contact Email</Label>
          <Input
            id="technicalContact"
            type="email"
            placeholder="developer@yourcompany.com"
            value={formState.technicalContact}
            onChange={(e) => handleInputChange('technicalContact', e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Person who will handle the technical integration (can be the same as primary contact)
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">Integration Support</h4>
              <p className="text-sm text-blue-700 mt-1">
                Our team will reach out to help with your integration once your account is set up. We provide comprehensive documentation, SDKs, and dedicated support.
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
          
          <Button onClick={handleNext}>
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