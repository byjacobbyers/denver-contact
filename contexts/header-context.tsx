'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface HeaderContextType {
  headerHeight: number
}

const HeaderContext = createContext<HeaderContextType>({ headerHeight: 0 })

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header')
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    // Initial measurement
    updateHeaderHeight()

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight)

    // Cleanup
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  return (
    <HeaderContext.Provider value={{ headerHeight }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderHeight() {
  return useContext(HeaderContext)
} 