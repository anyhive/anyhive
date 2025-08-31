"use client"

import { Button } from "@moneta-kit/ui/components/button"
import { Label } from "@moneta-kit/ui/components/label"
import { Checkbox } from "@moneta-kit/ui/components/checkbox"
import { StepLayout } from "@/components/onboarding/step-layout"
import { useOnboarding } from "@/contexts/onboarding-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function PaymentPage() {
  const router = useRouter()
  const { formData, updatePayment } = useOnboarding()
  const [formState, setFormState] = useState(formData.payment)

  const handleMethodToggle = (method: string, checked: boolean) => {
    const newMethods = { ...formState.preferredMethods, [method]: checked }
    const newData = { ...formState, preferredMethods: newMethods }
    setFormState(newData)
    updatePayment(newData)
  }

  const handleSelectChange = (field: string, value: string) => {
    const newData = { ...formState, [field]: value }
    setFormState(newData)
    updatePayment(newData)
  }

  const handleNext = () => {
    router.push('/onboarding/integration')
  }

  const handleBack = () => {
    router.push('/onboarding/business')
  }

  const hasSelectedMethod = Object.values(formState.preferredMethods).some(Boolean)

  return (
    <StepLayout
      stepNumber={4}
      stepTitle="Payment Configuration"
      stepDescription="Configure your payment methods and preferences"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Preferred Payment Methods</h3>
          <p className="text-sm text-gray-600">Select the payment methods you'd like to offer your customers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <Checkbox 
                id="creditCard"
                checked={formState.preferredMethods.creditCard}
                onCheckedChange={(checked) => handleMethodToggle('creditCard', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="creditCard" className="text-sm font-medium">Credit/Debit Cards</Label>
                <p className="text-xs text-gray-500">Visa, MasterCard, American Express</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <Checkbox 
                id="bankTransfer"
                checked={formState.preferredMethods.bankTransfer}
                onCheckedChange={(checked) => handleMethodToggle('bankTransfer', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="bankTransfer" className="text-sm font-medium">Bank Transfer</Label>
                <p className="text-xs text-gray-500">ACH, Wire transfers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <Checkbox 
                id="digitalWallet"
                checked={formState.preferredMethods.digitalWallet}
                onCheckedChange={(checked) => handleMethodToggle('digitalWallet', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="digitalWallet" className="text-sm font-medium">Digital Wallets</Label>
                <p className="text-xs text-gray-500">Apple Pay, Google Pay, PayPal</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <Checkbox 
                id="cryptocurrency"
                checked={formState.preferredMethods.cryptocurrency}
                onCheckedChange={(checked) => handleMethodToggle('cryptocurrency', checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor="cryptocurrency" className="text-sm font-medium">Cryptocurrency</Label>
                <p className="text-xs text-gray-500">Bitcoin, Ethereum, USDC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="settlementFrequency">Settlement Frequency</Label>
            <select
              id="settlementFrequency"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.settlementFrequency}
              onChange={(e) => handleSelectChange('settlementFrequency', e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Primary Currency</Label>
            <select
              id="currency"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formState.currency}
              onChange={(e) => handleSelectChange('currency', e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="riskTolerance">Risk Management Level</Label>
          <select
            id="riskTolerance"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formState.riskTolerance}
            onChange={(e) => handleSelectChange('riskTolerance', e.target.value)}
          >
            <option value="low">Low - Maximum security, may block some legitimate transactions</option>
            <option value="medium">Medium - Balanced security and convenience</option>
            <option value="high">High - Minimal restrictions, maximum transaction approval rate</option>
          </select>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-900">Payment Method Note</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You can always modify these settings later from your dashboard. Some payment methods may require additional verification.
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
            disabled={!hasSelectedMethod}
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