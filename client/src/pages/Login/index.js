import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { PersonIcon, CheckMarkIcon } from '../../icons'
import Logo from '../../img/logo.png'
import Loader from '../../components/Loader'
import MyContext from '../../store'

const LoginWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  & aside {
    display: flex;
    & > div {
      margin: auto;
      width: 280px;
    }
  }
  & .left {
    & h3 {
      text-align: center;
      font-size: 16px;
    }
    & .desc {
      font-size: 12px;
      font-weight: 500;
    }
    & .request-access {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & span {
        color: #ec0000;
        margin-left: 5px;
        font-weight: 600;
        transform: translate(0, -1px);
      }
    }
  }
  & .right {
    background-color: #ec0000;
    & div {
      & form {
        width: 300px;
        margin-top: 30px;
        & .inputWrap {
          width: 100%;
          margin-bottom: 15px;
          position: relative;
          & input {
            width: 100%;
            height: 36px;
            background-color: #200833;
            border: none;
            padding: 5px 15px;
            box-sizing: border-box;
            color: white;
            border-radius: 20px;
          }
          & .checkmark {
            position: absolute;
            right: 15px;
            top: 8px;
            display: none;
          }
        }
      }
      & .alert-message {
        font-size: 12px;
        text-align: center;
        color: white;
        margin: 8px;
        display: none;
      }
    }
  }
`

export default function Login() {
  const [showWrongEmailMsg, setShowWrongEmailMsg] = useState(false)
  const [emailPassed, setEmailPassed] = useState(false)
  const [showWrongPasswordMsg, setShowWrongPasswordMsg] = useState(false)
  const [passwordPassed, setPasswordPassed] = useState(false)
  const [correctInfo, setCorrectInfo] = useState({})
  const [showLoader, setShowLoader] = useState(false)

  const { setAccountInfo } = useContext(MyContext)

  const pswInput = useRef()

  const nav = useNavigate()

  useEffect(() => {
    if (emailPassed && passwordPassed) {
      setAccountInfo({
        email: correctInfo.email,
        name: correctInfo.name
      })
      setShowLoader(true)

      let userInfo = { ...correctInfo }
      delete userInfo['password']
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'token')
          setTimeout(() => {
            setShowLoader(false)
            nav('/dashboard', { replace: true })
            localStorage.setItem('token', data.token)
          }, 400)
        })
    }
  }, [emailPassed, passwordPassed, nav, setAccountInfo, correctInfo])

  const handleEmailInput = (e) => {
    let timer = null
    return (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fetch('/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: e.target.value
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if (data.length) {
              setShowWrongEmailMsg(false)
              setEmailPassed(true)
              setCorrectInfo(data[0])
              if (pswInput.current.value === data[0].password) {
                setShowWrongPasswordMsg(false)
                setPasswordPassed(true)
              }
            } else {
              setShowWrongEmailMsg(true)
              setEmailPassed(false)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }, 600)
    }
  }

  const handlePasswordInput = (e) => {
    let timer = null
    return (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (!emailPassed) {
          return
        }

        if (e.target.value === correctInfo.password) {
          setShowWrongPasswordMsg(false)
          setPasswordPassed(true)
        } else {
          setShowWrongPasswordMsg(true)
          setPasswordPassed(false)
        }
      }, 600)
    }
  }

  return (
    <LoginWrap>
      <aside className="left">
        <div>
          <h3>NEED ACCESS?</h3>
          <p className="desc">
            Welcome, this tool is a video archive of team generated videos. Here
            you can watch tutorials on day to day business operations.
          </p>
          <p className="request-access">
            <PersonIcon />
            <span>Request Access</span>
          </p>
        </div>
      </aside>
      <aside className="right">
        <div>
          <img
            style={{ width: '160px', margin: 'auto', display: 'block' }}
            src={Logo}
            alt="logo"
          />
          <form>
            <div className="inputWrap emailWrap">
              <input
                type="text"
                placeholder="Email"
                className="email"
                onChange={handleEmailInput()}
              />
              <span
                className="checkmark"
                style={emailPassed ? { display: 'block' } : null}
              >
                <CheckMarkIcon />
              </span>
            </div>
            <div className="inputWrap pswWrap">
              <input
                type="password"
                placeholder="Password"
                className="psw"
                onChange={handlePasswordInput()}
                ref={pswInput}
              />
              <span
                className="checkmark"
                style={passwordPassed ? { display: 'block' } : null}
              >
                <CheckMarkIcon />
              </span>
            </div>
          </form>
          {showLoader ? <Loader /> : null}
          <p
            className="alert-message wrong-email"
            style={showWrongEmailMsg ? { display: 'block' } : null}
          >
            This email does not exist.
          </p>
          <p
            className="alert-message wrong-password"
            style={showWrongPasswordMsg ? { display: 'block' } : null}
          >
            The password you entered is incorrect.
          </p>
        </div>
      </aside>
    </LoginWrap>
  )
}
