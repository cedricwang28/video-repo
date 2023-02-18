import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'

export default function Dashboard() {
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      nav('/login')
      return
    }

    // fetch('/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     token
    //   })
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (!data.code) {
    //       nav('/login')
    //     }
    //     console.log('auth')
    //   })
  })

  return (
    <div>
      <NavBar />
      <SearchBar />
      <Outlet />
    </div>
  )
}
