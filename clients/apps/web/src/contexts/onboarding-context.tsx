"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface OnboardingFormData {
  // Company/Organization basic information
  organization: {
    name: string
    type: string
    description: string
  }
  
  // Contact information
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
    position: string
  }
  
  // Business details
  business: {
    industry: string
    size: string
    monthlyVolume: string
    website: string
    address: string
    city: string
    zipCode: string
  }
  
  // Payment preferences
  payment: {
    preferredMethods: {
      creditCard: boolean
      bankTransfer: boolean
      digitalWallet: boolean
      cryptocurrency: boolean
    }
    settlementFrequency: string
    currency: string
    riskTolerance: string
  }
  
  // Integration preferences
  integration: {
    platforms: string[]
    apiUsage: boolean
    webhooks: boolean
    customIntegration: boolean
    technicalContact: string
  }
}

const initialFormData: OnboardingFormData = {
  organization: {
    name: '',
    type: '',
    description: ''
  },
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: ''
  },
  business: {
    industry: '',
    size: '',
    monthlyVolume: '',
    website: '',
    address: '',
    city: '',
    zipCode: ''
  },
  payment: {
    preferredMethods: {
      creditCard: true,
      bankTransfer: true,
      digitalWallet: false,
      cryptocurrency: false
    },
    settlementFrequency: 'daily',
    currency: 'USD',
    riskTolerance: 'medium'
  },
  integration: {
    platforms: [],
    apiUsage: false,
    webhooks: false,
    customIntegration: false,
    technicalContact: ''
  }
}

type OnboardingAction = 
  | { type: 'UPDATE_ORGANIZATION'; payload: Partial<OnboardingFormData['organization']> }
  | { type: 'UPDATE_CONTACT'; payload: Partial<OnboardingFormData['contact']> }
  | { type: 'UPDATE_BUSINESS'; payload: Partial<OnboardingFormData['business']> }
  | { type: 'UPDATE_PAYMENT'; payload: Partial<OnboardingFormData['payment']> }
  | { type: 'UPDATE_INTEGRATION'; payload: Partial<OnboardingFormData['integration']> }
  | { type: 'LOAD_FROM_STORAGE'; payload: OnboardingFormData }
  | { type: 'CLEAR_ALL' }

function onboardingReducer(state: OnboardingFormData, action: OnboardingAction): OnboardingFormData {
  switch (action.type) {
    case 'UPDATE_ORGANIZATION':
      return { ...state, organization: { ...state.organization, ...action.payload } }
    case 'UPDATE_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.payload } }
    case 'UPDATE_BUSINESS':
      return { ...state, business: { ...state.business, ...action.payload } }
    case 'UPDATE_PAYMENT':
      return { ...state, payment: { ...state.payment, ...action.payload } }
    case 'UPDATE_INTEGRATION':
      return { ...state, integration: { ...state.integration, ...action.payload } }
    case 'LOAD_FROM_STORAGE':
      return action.payload
    case 'CLEAR_ALL':
      return initialFormData
    default:
      return state
  }
}

interface OnboardingContextType {
  formData: OnboardingFormData
  updateOrganization: (data: Partial<OnboardingFormData['organization']>) => void
  updateContact: (data: Partial<OnboardingFormData['contact']>) => void
  updateBusiness: (data: Partial<OnboardingFormData['business']>) => void
  updatePayment: (data: Partial<OnboardingFormData['payment']>) => void
  updateIntegration: (data: Partial<OnboardingFormData['integration']>) => void
  clearAll: () => void
  saveToStorage: () => void
  loadFromStorage: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const STORAGE_KEY = 'anyhive-onboarding-data'

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [formData, dispatch] = useReducer(onboardingReducer, initialFormData)

  const loadFromStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedData = JSON.parse(stored)
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData })
        }
      }
    } catch (error) {
      console.error('Failed to load stored data:', error)
    }
  }

  const saveToStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      }
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }

  useEffect(() => {
    loadFromStorage()
  }, [])

  useEffect(() => {
    saveToStorage()
  }, [formData])

  const updateOrganization = (data: Partial<OnboardingFormData['organization']>) => {
    dispatch({ type: 'UPDATE_ORGANIZATION', payload: data })
  }

  const updateContact = (data: Partial<OnboardingFormData['contact']>) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: data })
  }

  const updateBusiness = (data: Partial<OnboardingFormData['business']>) => {
    dispatch({ type: 'UPDATE_BUSINESS', payload: data })
  }

  const updatePayment = (data: Partial<OnboardingFormData['payment']>) => {
    dispatch({ type: 'UPDATE_PAYMENT', payload: data })
  }

  const updateIntegration = (data: Partial<OnboardingFormData['integration']>) => {
    dispatch({ type: 'UPDATE_INTEGRATION', payload: data })
  }

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const value: OnboardingContextType = {
    formData,
    updateOrganization,
    updateContact,
    updateBusiness,
    updatePayment,
    updateIntegration,
    clearAll,
    saveToStorage,
    loadFromStorage
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}