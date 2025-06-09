export type ThemeMode = 'light' | 'dark' | 'system'

export interface GeolocationData {
  country: string
  region: string
  isLoading: boolean
  error: string | null
}

export interface CookieConsent {
  analytics: boolean
  marketing: boolean
  necessary: boolean
  preferences: boolean
}

export interface AppContextType {
  // Geolocation
  geolocation: GeolocationData
  updateGeolocation: (data: Partial<GeolocationData>) => void
  
  // Theme
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  isDarkMode: boolean
  
  // Cookie Consent
  cookieConsent: CookieConsent
  updateCookieConsent: (consent: Partial<CookieConsent>) => void
  hasAcceptedCookies: boolean
} 