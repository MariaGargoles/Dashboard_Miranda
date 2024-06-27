import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from '../pages/Index.jsx'
import { DashboardPage } from '../pages/Dashboard.jsx'
import { ContactPage } from '../pages/Contact.jsx'

import { RoomPage } from '../pages/Rooms.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/rooms" element={<RoomPage/>}/>
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
)
