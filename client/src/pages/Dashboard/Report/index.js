import React from 'react'
import styled from 'styled-components'

const ReportWrap = styled.div`
  width: 100vw;
  padding: 50px 10vw;
  display: flex;
  box-sizing: border-box;
  & main {
    border-radius: 16px;
    width: 100%;
    height: auto;
    padding: 30px 10vw;
    color: black;
    & > div {
      width: 100%;
      & p {
        width: 50%;
        margin-bottom: 30px;
      }
      & .textarea {
        width: 100%;
        height: 250px;
        border-radius: 20px;
        border: 1px solid black;
        padding: 20px;
      }
      & .submit {
        padding: 10px 30px;
        background-color: #200833;
        color: white;
        border: none;
        border-radius: 20px;
        float: right;
        margin-top: 20px;
      }
    }
  }
`

export default function Report() {
  return (
    <ReportWrap>
      <main>
        <div>
          <p>
            Please explain in detail as best as you can what the issue you've
            encouterd
          </p>
          <textarea className="textarea" />
          <button className="submit">Submit Request</button>
        </div>
      </main>
    </ReportWrap>
  )
}
