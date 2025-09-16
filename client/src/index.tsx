import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './Providers'
import App from './App'

// Use Vite's BASE_URL to set react-router basename on GitHub Pages
const basename = (import.meta as any).env.BASE_URL?.replace(/\/$/, '') || ''

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
)
