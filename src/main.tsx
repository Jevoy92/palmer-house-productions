import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CriticalStyles } from './components/performance/CriticalStyles'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CriticalStyles />
    <App />
  </React.StrictMode>
)
