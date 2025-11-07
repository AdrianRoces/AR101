import './App.css'
import './index.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/homepage'
import Dashboard from './pages/Dashboard'
import GuidePage from './pages/guide'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [autoOpenSignup, setAutoOpenSignup] = useState(false)

  const handleAuthSuccess = (data: any) => {
    console.log('Auth success:', data)
    setIsLoggedIn(true)
    setUserData(data)
    setAutoOpenSignup(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null)
    setAutoOpenSignup(false)
  }

  const handleOpenSignup = () => {
    setAutoOpenSignup(true)
  }

  const handleOpenSignin = () => {
    setAutoOpenSignup(false)
  }

  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/guide" element={
            <GuidePage 
              isLoggedIn={isLoggedIn}
              onOpenSignup={handleOpenSignup}
              onOpenSignin={handleOpenSignin}
            />
          } />
          <Route path="/dashboard" element={
            isLoggedIn ? (
              <Dashboard 
                userData={userData}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />
          <Route path="/" element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Homepage 
                onAuthSuccess={handleAuthSuccess}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
                userData={userData}
                autoOpenSignup={autoOpenSignup}
                onAutoOpenSignupComplete={() => setAutoOpenSignup(false)}
              />
            )
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App