import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CounterProvider from './CounterProvider';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider initialCount={10}>
      <App />
    </CounterProvider>
  </StrictMode>,
)
