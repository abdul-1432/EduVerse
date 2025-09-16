import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './Providers'

function Root() {
  return (
    <Providers>
      <div style={{padding: 16}}>Loading…</div>
    </Providers>
  )
}

export default Root
