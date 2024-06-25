import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from '../pages/Index.jsx'
import { DashboardComponent } from '../pages/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/dashboard" element={<DashboardComponent/>}/>
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
)
