import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const VideoWrap = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  & .video-info {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    & .video-title {
      padding: 40px 20px;
      background-color: #200833;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      box-sizing: border-box;
      & h3 {
        font-size: 24px;
      }
    }
    & .video-tags {
      padding: 0px 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      & .tags {
        & span {
          color: #ec0000;
          font-weight: 600;
          margin-right: 6px;
        }
        font-style: italic;
      }
    }
  }
  & .video-play {
    width: 100%;
    left: 0;
    display: block;
    margin: auto;
  }
`

export default function Video() {
  const [videoData, setVideoData] = useState({})
  const [tags, setTags] = useState('')
  let { id } = useParams()

  useEffect(() => {
    fetch(`/video/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data[0])
        setTags(data[0].tags.join(', '))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [id])

  return (
    <VideoWrap>
      <div className="video-info">
        <div className="video-title">
          <h3>{videoData.title}</h3>
        </div>
        <div className="video-tags">
          <p className="tags">
            <span>Tags:</span>
            {tags}
          </p>
        </div>
      </div>
      <video
        src={videoData.url}
        className="video-play"
        controls
        autoPlay
      ></video>
    </VideoWrap>
  )
}
