import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import MyContext from '../../../../store'

const DetailsWrap = styled.div`
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

export default function Details(props) {
  const { name, email } = props.profile
  return (
    <DetailsWrap>
      <div className="field">
        <p className="field-title">Full Name</p>
        <p className="field-content">{name}</p>
      </div>
      <div className="field">
        <p className="field-title">Email</p>
        <p className="field-content">{email}</p>
      </div>
    </DetailsWrap>
  )
}
