import React from 'react'
import { Providers } from './Providers'
import App from './App'

export function RootApp() {
  return (
    <Providers>
      <App />
    </Providers>
  )
}
