import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { PlayIcon } from '../../../icons'
import { tags } from '../../../config'

const TrainingWrap = styled.div`
  width: 100vw;
  box-sizing: border-box;
  & .section-title {
    width: 100%;
    padding: 30px 60px;
    color: white;
    font-size: 25px;
    font-weight: 700;
    background-color: #200833;
  }
  & .video-outer {
    width: 100vw;
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr;
    & .video-info {
      display: grid;
      grid-template-columns: 1fr;
      & .video-title {
        background-color: #200833;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        box-sizing: border-box;
      }
    }
    & .video-play {
      width: 100%;
      left: 0;
      display: block;
      margin: auto;
    }
  }
  & main {
    box-sizing: border-box;
    padding: 5vh 4vw;
    width: 100%;
    & .videos-outer {
      margin-bottom: 4vh;
      & .video-tag-title {
        font-size: 20px;
      }
      & .new-video-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 2vh 1vw;
        & .video-item {
          border: 2px #ec0000 solid;
          min-height: 140px;
          padding: 10px;
          padding-bottom: 50px;
          cursor: pointer;
          position: relative;
          & .item-title {
            margin: 0;
            font-size: 13px;
          }
          & .duration {
            position: absolute;
            bottom: 12px;
            left: 15px;
            font-size: 12px;
            font-weight: 600;
          }
          & .play-icon {
            position: absolute;
            right: 15px;
            bottom: 5px;
          }
        }
      }
    }
  }
`

const classifyVideos = function (data) {
  let data2 = {}
  for (let i of data) {
    for (let v of i.tags) {
      data2[v] ? data2[v].push(i) : (data2[v] = [i])
    }
  }
  return data2
}

export default function Learning() {
  const [classifiedVideos, setClassifiedVideos] = useState({})

  let navigate = useNavigate()

  useEffect(() => {
    console.log('effect')
    fetch('/videos')
      .then((response) => response.json())
      .then((res) => {
        setClassifiedVideos(classifyVideos(res.data))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const handleVideoClick = (e) => {
    let vid = e.currentTarget.id
    navigate(`/dashboard/video/${vid}`)
  }

  return (
    <TrainingWrap>
      <p className="section-title">Training</p>
      <main>
        {Object.entries(classifiedVideos).map((value, index) => {
          return (
            <div className="videos-outer" key={value[0]}>
              <h3 className="video-tag-title">{value[0]}</h3>
              <div className="new-video-list">
                {value[1].map((v, i) => {
                  return (
                    <div
                      className="video-item"
                      key={v._id}
                      id={v._id}
                      onClick={handleVideoClick}
                    >
                      <p className="item-title">{v.title}</p>
                      <span className="duration">{v.duration}</span>
                      <span className="play-icon">
                        <PlayIcon />
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </main>
    </TrainingWrap>
  )
}
