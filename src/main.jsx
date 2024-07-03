import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthUserContext.jsx';
import { IndexPage } from './pages/Index.jsx';
import { DashboardPage } from './pages/Dashboard.jsx';
import { ContactPage } from './pages/Contact.jsx';
import { RoomPage } from './pages/Rooms.jsx';
import { BookingPage } from './pages/Bookings.jsx';
import { UserPage } from './pages/Users.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);
