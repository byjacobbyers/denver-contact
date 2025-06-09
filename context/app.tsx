'use client'

import { createContext, useContext } from 'react'
// import { AppContextType, CookieConsent, GeolocationData, ThemeMode } from '@/types/context'

// const defaultGeolocation: GeolocationData = {
//   country: '',
//   region: '',
//   isLoading: true,
//   error: null
// }

// const defaultCookieConsent: CookieConsent = {
//   analytics: false,
//   marketing: false,
//   necessary: true, // Always true as it's required for basic functionality
//   preferences: false
// }

const AppContext = createContext<any>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // // Theme state
  // const [theme, setTheme] = useState<ThemeMode>('system')
  // const [isDarkMode, setIsDarkMode] = useState(false)
  
  // // Geolocation state
  // const [geolocation, setGeolocation] = useState<GeolocationData>(defaultGeolocation)
  
  // // Cookie consent state
  // const [cookieConsent, setCookieConsent] = useState<CookieConsent>(defaultCookieConsent)
  
  // // Initialize theme from localStorage
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme') as ThemeMode
  //   if (savedTheme) {
  //     setTheme(savedTheme)
  //   }
  // }, [])
  
  // // Handle theme changes
  // useEffect(() => {
  //   const root = window.document.documentElement
  //   root.classList.remove('light', 'dark')
    
  //   if (theme === 'system') {
  //     const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  //     root.classList.add(systemTheme)
  //     setIsDarkMode(systemTheme === 'dark')
  //   } else {
  //     root.classList.add(theme)
  //     setIsDarkMode(theme === 'dark')
  //   }
    
  //   localStorage.setItem('theme', theme)
  // }, [theme])
  
  // // Handle geolocation
  // useEffect(() => {
  //   const fetchGeolocation = async () => {
  //     try {
  //       // Try to get location from Vercel Edge
  //       const response = await fetch('/api/geolocation')
  //       const data = await response.json()
        
  //       setGeolocation({
  //         country: data.country,
  //         region: data.region,
  //         isLoading: false,
  //         error: null
  //       })
  //     } catch (error) {
  //       // Fallback to browser geolocation
  //       if ('geolocation' in navigator) {
  //         navigator.geolocation.getCurrentPosition(
  //           async (position) => {
  //             try {
  //               const response = await fetch(
  //                 `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
  //               )
  //               const data = await response.json()
                
  //               setGeolocation({
  //                 country: data.countryName,
  //                 region: data.principalSubdivision,
  //                 isLoading: false,
  //                 error: null
  //               })
  //             } catch (error) {
  //               setGeolocation({
  //                 ...defaultGeolocation,
  //                 isLoading: false,
  //                 error: 'Failed to fetch location data'
  //               })
  //             }
  //           },
  //           (error) => {
  //             setGeolocation({
  //               ...defaultGeolocation,
  //               isLoading: false,
  //               error: 'Geolocation permission denied'
  //             })
  //           }
  //         )
  //       } else {
  //         setGeolocation({
  //           ...defaultGeolocation,
  //           isLoading: false,
  //           error: 'Geolocation not supported'
  //         })
  //       }
  //     }
  //   }
    
  //   fetchGeolocation()
  // }, [])
  
  // // Initialize cookie consent from localStorage
  // useEffect(() => {
  //   const savedConsent = localStorage.getItem('cookieConsent')
  //   if (savedConsent) {
  //     setCookieConsent(JSON.parse(savedConsent))
  //   }
  // }, [])
  
  // // Save cookie consent to localStorage
  // useEffect(() => {
  //   localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent))
  // }, [cookieConsent])
  
  const value = {
    // // Geolocation
    // geolocation,
    // updateGeolocation: (data) => setGeolocation(prev => ({ ...prev, ...data })),
    
    // // Theme
    // theme,
    // setTheme,
    // isDarkMode,
    
    // // Cookie Consent
    // cookieConsent,
    // updateCookieConsent: (consent) => setCookieConsent(prev => ({ ...prev, ...consent })),
    // hasAcceptedCookies: Object.values(cookieConsent).some(Boolean)
  }
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
} 