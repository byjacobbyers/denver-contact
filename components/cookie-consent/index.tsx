'use client'

import { useAppContext } from '@/context/app'

export function CookieConsentBanner() {
  const { updateCookieConsent, hasAcceptedCookies } = useAppContext()
  
  if (hasAcceptedCookies) return null
  
  const handleAcceptAll = () => {
    updateCookieConsent({
      analytics: true,
      marketing: true,
      necessary: true,
      preferences: true
    })
  }
  
  const handleAcceptNecessary = () => {
    updateCookieConsent({
      analytics: false,
      marketing: false,
      necessary: true,
      preferences: false
    })
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cookie Settings
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Please select which cookies you&apos;re willing to store on your browser.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAcceptNecessary}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Necessary Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
} 