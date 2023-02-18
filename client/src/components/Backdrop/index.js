import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const BackdropWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #200833cc;
  display: flex;
  z-index: 2;
`

export default function Backdrop(props) {
  return ReactDOM.createPortal(
    <BackdropWrap>{props.children}</BackdropWrap>,
    document.querySelector('#backdrop-root')
  )
}
