'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RecaptchaManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if there's a form component on the current page
    const checkForForm = () => {
      // Look for the form-block component in the DOM
      const formBlock = document.querySelector('.form-block')
      const hasForm = !!formBlock
      
      if (hasForm) {
        document.body.classList.add('show-recaptcha')
      } else {
        document.body.classList.remove('show-recaptcha')
      }
    }

    // Check immediately
    checkForForm()
    
    // Also check after a small delay to ensure components have rendered
    const timeoutId = setTimeout(checkForForm, 100)
    
    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
