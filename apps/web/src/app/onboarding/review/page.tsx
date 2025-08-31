"use client"

import { Button } from "@moneta-kit/ui/components/button"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"

export default function ReviewPage() {
  const router = useRouter()
  const { formData } = useOnboarding()

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log('Submitting form data:', formData)
    router.push('/onboarding/complete')
  }

  const handleBack = () => {
    router.push('/onboarding/integration')
  }

  const handleEdit = (step: string) => {
    router.push(`/onboarding/${step}`)
  }

  const getSelectedPaymentMethods = () => {
    return Object.entries(formData.payment.preferredMethods)
      .filter(([_, selected]) => selected)
      .map(([method]) => method.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
  }

  return (
    <StepLayout
      stepNumber={6}
      stepTitle="Review & Submit"
      stepDescription="Please review your information before submitting"
    >
      <div className="space-y-6">
        {/* Organization Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Organization</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit('organization')}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Name:</span> {formData.organization.name || 'Not provided'}</div>
            <div><span className="font-medium">Type:</span> {formData.organization.type || 'Not provided'}</div>
            {formData.organization.description && (
              <div><span className="font-medium">Description:</span> {formData.organization.description}</div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit('contact')}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Name:</span> {formData.contact.firstName} {formData.contact.lastName}</div>
            <div><span className="font-medium">Email:</span> {formData.contact.email || 'Not provided'}</div>
            <div><span className="font-medium">Phone:</span> {formData.contact.phone || 'Not provided'}</div>
            {formData.contact.position && (
              <div><span className="font-medium">Position:</span> {formData.contact.position}</div>
            )}
          </div>
        </div>

        {/* Business Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Business Details</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit('business')}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Industry:</span> {formData.business.industry || 'Not provided'}</div>
            <div><span className="font-medium">Company Size:</span> {formData.business.size || 'Not provided'}</div>
            <div><span className="font-medium">Monthly Volume:</span> {formData.business.monthlyVolume || 'Not provided'}</div>
            {formData.business.website && (
              <div><span className="font-medium">Website:</span> {formData.business.website}</div>
            )}
            {formData.business.address && (
              <div><span className="font-medium">Address:</span> {formData.business.address}, {formData.business.city} {formData.business.zipCode}</div>
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Payment Configuration</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit('payment')}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Payment Methods:</span> {getSelectedPaymentMethods().join(', ') || 'None selected'}</div>
            <div><span className="font-medium">Settlement:</span> {formData.payment.settlementFrequency}</div>
            <div><span className="font-medium">Currency:</span> {formData.payment.currency}</div>
            <div><span className="font-medium">Risk Level:</span> {formData.payment.riskTolerance}</div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Integration Preferences</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit('integration')}
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Platforms:</span> {formData.integration.platforms.length > 0 ? formData.integration.platforms.join(', ') : 'None selected'}</div>
            <div><span className="font-medium">API Usage:</span> {formData.integration.apiUsage ? 'Yes' : 'No'}</div>
            <div><span className="font-medium">Webhooks:</span> {formData.integration.webhooks ? 'Yes' : 'No'}</div>
            <div><span className="font-medium">Custom Integration:</span> {formData.integration.customIntegration ? 'Yes' : 'No'}</div>
            {formData.integration.technicalContact && (
              <div><span className="font-medium">Technical Contact:</span> {formData.integration.technicalContact}</div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">Next Steps</h4>
              <p className="text-sm text-blue-700 mt-1">
                After submitting, our team will review your application and contact you within 24 hours to complete the setup and provide your API credentials.
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
            onClick={handleSubmit}
            size="lg"
            className="px-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Submit Application
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}