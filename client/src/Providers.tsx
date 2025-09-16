import React from 'react'
import { AuthProvider } from './state/auth'
import { AccessibilityProvider } from './state/accessibility'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </AuthProvider>
  )
}
