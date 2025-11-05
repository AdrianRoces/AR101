import './App.css'
import './index.css'
import { useState } from 'react'
import Homepage from './pages/homepage'
import Dashboard from './pages/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  const handleAuthSuccess = (data: any) => {
    console.log('Auth success:', data)
    setIsLoggedIn(true)
    setUserData(data)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null)
  }

  return (
    <div className="w-full min-h-screen">
      {isLoggedIn ? (
        <Dashboard 
          userData={userData}
          onLogout={handleLogout}
        />
      ) : (
        <Homepage 
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
      )}
    </div>
  )
}

export default App