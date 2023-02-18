import React from 'react'
import styled from 'styled-components'

const SubmissionsWrap = styled.div`
  width: 100%;
  padding: 40px 5vw;
  box-sizing: border-box;
  & .field {
    margin-bottom: 35px;
    & .field-title {
      font-size: 12px;
      margin: 0;
    }
    & .field-content {
      font-weight: 500;
      margin-top: 6px;
    }
  }
`

export default function Details() {
  return (
    <SubmissionsWrap>
      <div>ticket 1529</div>
    </SubmissionsWrap>
  )
}
