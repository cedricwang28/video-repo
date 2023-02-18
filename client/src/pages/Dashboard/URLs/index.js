import React from 'react'
import styled from 'styled-components'

const URLsWrap = styled.div`
  width: 100%;
  & .section-title {
    width: 100%;
    padding: 30px 60px;
    color: white;
    font-size: 25px;
    font-weight: 700;
    background-color: #200833;
  }
`

export default function URLs() {
  return (
    <URLsWrap>
      <p className="section-title">URL's</p>
    </URLsWrap>
  )
}
