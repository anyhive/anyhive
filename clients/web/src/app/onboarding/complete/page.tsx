"use client"

import { Button } from "@moneta-kit/ui/components/button"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useRouter } from "next/navigation"

export default function CompletePage() {
  const router = useRouter()

  const handleDashboard = () => {
    // Redirect to main dashboard or sign-in page
    router.push('/sign-in')
  }

  const handleDocs = () => {
    // Open documentation in new tab
    window.open('https://docs.moneta.com', '_blank')
  }

  return (
    <StepLayout showStepHeader={false}>
      <div className="flex flex-col items-center gap-y-6 text-center">
        {/* Success Icon */}
        <div className="flex">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Application Submitted Successfully!
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            Thank you for choosing Moneta. Your payment infrastructure setup is now in progress.
          </p>
        </div>

        {/* What's Next */}
        <div className="w-full max-w-2xl space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">What happens next?</h3>
          
          <div className="grid gap-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Review & Verification</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our team will review your application and verify your information within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Account Setup</h4>
                <p className="text-sm text-gray-600 mt-1">
                  We'll create your account and configure your payment settings according to your preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">API Credentials & Integration</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You'll receive your API keys and integration instructions via email. Our team will assist with setup if needed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg text-left">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Go Live</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Start accepting payments with your fully configured Moneta payment infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full max-w-2xl">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-medium text-blue-900">Need Help?</h4>
              <p className="text-sm text-blue-700 mt-1">
                Our support team is available 24/7 at{' '}
                <a href="mailto:support@moneta.com" className="underline">support@moneta.com</a>
                {' '}or via our documentation portal.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            variant="outline" 
            onClick={handleDocs}
            className="flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Documentation
          </Button>
          
          <Button 
            onClick={handleDashboard}
            className="flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z" />
            </svg>
            Sign In to Dashboard
          </Button>
        </div>
      </div>
    </StepLayout>
  )
}