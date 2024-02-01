import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
