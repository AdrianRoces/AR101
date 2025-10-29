import './App.css'
import './index.css'
import { useState } from 'react'
import Homepage from './pages/homepage'
import SensorDashboard from './components/SensorDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<'homepage' | 'dashboard'>('homepage')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAuthSuccess = (data: any) => {
    console.log('Auth success:', data)
    setIsLoggedIn(true)
    setCurrentPage('dashboard') // Redirect to dashboard after login
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('homepage')
  }

  return (
    <div className="w-full min-h-screen">
      {currentPage === 'homepage' && (
        <Homepage 
          onAuthSuccess={handleAuthSuccess}
          isLoggedIn={isLoggedIn}
        />
      )}
      {currentPage === 'dashboard' && (
        <SensorDashboard onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App