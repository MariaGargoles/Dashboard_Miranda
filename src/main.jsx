import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexPage } from './pages/Index.jsx'
import { DashboardPage } from './pages/Dashboard.jsx'
import { ContactPage } from './pages/Contact.jsx'

import { RoomPage } from './pages/Rooms.jsx'
import { BookingPage } from './pages/Bookings.jsx'
import { UserPage } from './pages/Users.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/rooms" element={<RoomPage/>}/>
      <Route path="/booking" element={<BookingPage/>}/>
      <Route path="/users" element={<UserPage/>}/>
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
)
