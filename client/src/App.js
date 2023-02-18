import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Training from './pages/Dashboard/Training'
import URLs from './pages/Dashboard/URLs'
import Request from './pages/Dashboard/Management'
import Report from './pages/Dashboard/Report'
import Account from './pages/Dashboard/Account'
import Video from '../src/components/Video'
import MyContext from './store'

function App() {
  const [accountInfo, setAccountInfo] = useState({})

  return (
    <MyContext.Provider value={{ ...accountInfo, setAccountInfo }}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="training/*" element={<Training />} />
            <Route path="urls" element={<URLs />} />
            <Route path="request" element={<Request />} />
            <Route path="account/*" element={<Account />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="" element={<Navigate to="training" />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </MyContext.Provider>
  )
}

export default App
