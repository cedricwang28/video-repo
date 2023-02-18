import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Spin = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #200833;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin: auto;
  animation: ${spin} 2s linear infinite;
`

export default function Loader() {
  return <Spin />
}
