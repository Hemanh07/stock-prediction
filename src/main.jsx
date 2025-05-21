import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StockPredictionDashboard from './StockPredictionDashboard.jsx'
import StockPredictor from './StockPredictor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockPredictionDashboard />
  </StrictMode>,
)
