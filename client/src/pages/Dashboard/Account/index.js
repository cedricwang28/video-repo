import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Details from './Details'
import Submissions from './Submissions'

const AccountWrap = styled.div`
  width: 100vw;
  padding: 50px 8vw;
  display: flex;
  box-sizing: border-box;
  & main {
    width: 100%;
    height: auto;
    & .head {
      width: 100%;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      & .logout {
        color: dodgerblue;
        cursor: pointer;
      }
    }
    & .body {
      width: 100%;
      height: 450px;
      box-sizing: border-box;
      background-color: #ddd;
      & .tabs {
        width: 100%;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: #eee;
        & span {
          padding: 8px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        & a {
          text-decoration: none;
          &:active {
            color: black;
          }
        }
        & .selected span {
          background-color: #ddd;
          color: black;
        }
      }
    }
  }
`

export default function Account() {
  const [profile, setProfile] = useState({})
  const [firstname, SetFirstname] = useState('')

  const nav = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    nav('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      nav('/login')
      return
    }

    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.code) {
          nav('/login')
        }
        setProfile(data.payload)
        SetFirstname(data.payload.name.split(' ')[0])
      })
  }, [nav])

  return (
    <AccountWrap>
      <main>
        <div className="head">
          <span>Hey {firstname}</span>
          <span className="logout" onClick={handleLogout}>
            LOGOUT
          </span>
        </div>
        <div className="body">
          <div className="tabs">
            <NavLink
              to="details"
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              <span>Details</span>
            </NavLink>

            <NavLink
              to="submissions"
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              <span>Bugs &amp; Video Requests </span>
            </NavLink>
          </div>

          <Routes>
            <Route path="details" element={<Details profile={profile} />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="" element={<Navigate to="details" />} />
          </Routes>
        </div>
      </main>
    </AccountWrap>
  )
}
