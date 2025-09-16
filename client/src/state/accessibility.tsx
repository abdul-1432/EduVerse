import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth'
import { api } from '../lib/api'

type Accessibility = { dyslexiaFont: boolean; highContrast: boolean; reducedMotion: boolean }

type AccessibilityContextType = {
  settings: Accessibility
  setSettings: (s: Accessibility) => void
}

const defaultSettings: Accessibility = { dyslexiaFont: false, highContrast: false, reducedMotion: false }

const AccessibilityContext = createContext<AccessibilityContextType>(null as any)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  const [settings, setSettingsState] = useState<Accessibility>(() => {
    const saved = localStorage.getItem('accessibility')
    return saved ? JSON.parse(saved) : defaultSettings
  })

  useEffect(() => {
    document.body.classList.toggle('dyslexia-font', settings.dyslexiaFont)
    document.body.classList.toggle('high-contrast', settings.highContrast)
    document.body.classList.toggle('reduced-motion', settings.reducedMotion)
    localStorage.setItem('accessibility', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (!token) return
    api.updateAccessibility(token, settings).catch(() => {})
  }, [token, settings])

  function setSettings(s: Accessibility) { setSettingsState(s) }

  return (
    <AccessibilityContext.Provider value={{ settings, setSettings }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() { return useContext(AccessibilityContext) }
