import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import './index.css'
import App from './App.tsx'

// Dynamically import domAnimation features — avoids bundling the full
// Framer Motion feature set synchronously at startup
const loadFeatures = () =>
  import('framer-motion').then((res) => res.domAnimation)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
