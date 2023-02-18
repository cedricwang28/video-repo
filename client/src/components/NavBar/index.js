import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../img/logo.png'
import {
  LearningIcon,
  UploadIcon,
  CalendarIcon,
  LinkIcon,
  AccountIcon
} from '../../icons'

const Nav = styled.nav`
  height: 60px;
  width: 100vw;
  background-color: #ec0000;
  display: flex;
  position: relative;
  & > .logo {
    margin: auto;
    display: block;
    width: 90px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  & > ul {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    & .selected .triangle {
      position: absolute;
      width: 100%;
      height: 5px;
      bottom: 0;
      left: 0;
      left: 50%;
      box-sizing: border-box;
      transform: translate(-50%, 0);
      border: none;
      background-color: white;
    }
    & li {
      color: white;
      height: 100%;
      padding: 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
    }
    & .left-float {
      float: left;
      position: relative;
    }
    & .right-float {
      float: right;
      position: relative;
    }
    & .icon-wrap {
      display: flex;
      justify-content: center;
    }
    & span {
      display: block;
      margin-top: 3px;
    }
  }
`

export default function NavBar() {
  return (
    <Nav>
      <img src={Logo} alt="logo" className="logo" />
      <ul>
        <NavLink
          to="/dashboard/training"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          <li className="left-float">
            <div>
              <div className="icon-wrap">
                <LearningIcon />
              </div>
              <span>Training</span>
            </div>
            <div className="triangle"></div>
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/urls"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          <li className="left-float">
            <div>
              <div className="icon-wrap">
                <LinkIcon />
              </div>
              <span>URL's</span>
            </div>
            <div className="triangle"></div>
          </li>
        </NavLink>
        <NavLink
          to="/dashboard/request"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          <li className="left-float">
            <div>
              <div className="icon-wrap">
                <CalendarIcon />
              </div>
              <span>Management</span>
            </div>
            <div className="triangle"></div>
          </li>
        </NavLink>

        <NavLink
          to="/dashboard/account"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          <li className="right-float">
            <div>
              <div className="icon-wrap">
                <AccountIcon />
              </div>
              <span>Account</span>
            </div>
            <div className="triangle"></div>
          </li>
        </NavLink>
      </ul>
    </Nav>
  )
}
