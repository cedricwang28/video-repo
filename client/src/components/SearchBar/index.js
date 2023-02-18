import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchIcon, CloudIcon } from '../../icons'
import Loader from '../Loader'
import Backdrop from '../Backdrop'
import uploadImg from '../../img/upload.png'
import cross from '../../img/cross.png'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import storage from '../../firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { tags } from '../../config'
import { TagPicker } from 'rsuite'

const tags_choice = [...tags].map((item) => ({
  label: item,
  value: item
}))

const SearchBarWrap = styled.div`
  height: 80px;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content:center;
  align-items:center;
  position: relative;
  padding:0 5vw;
  box-sizing:border-box;
  & main{
    width:100%;
    & .search-outer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 550px;
        position:relative;
        height:auto;
        float:left;
        & .search-wrap {
          height: 40px;
          width:100%;
          border: none;
          border-radius: 20px;
          background-color: #200833;
          color: white;
          display: flex;
          padding: 5px 15px;
          box-sizing: border-box;
          & .icon-wrap {
            display: flex;
            justify-centent: center;
            align-items: center;
          }
          & .search-input {
            flex-grow: 100;
            margin-left: 10px;
            border: none;
            background-color: #200833;
            outline: none;
            color: white;
          }
        }
        & .active.search-wrap{
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }
        & .search-prompt {
          list-style: none;
          margin: 0;
          width: 550px;
          background-color: #200833;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          color: white;
          padding: 0px;
          padding-bottom:5px;
          overflow:hidden;
          z-index:100;
          display:none;
          position:absolute;
          top:100%;
          & li {
            height: 35px;
            padding: 0px 42px;
            font-size: 13px;
            font-weight: 400;
            display: flex;
            cursor:pointer;
            &:hover {
              background-color:grey;
            }
            & .search-result {
              width: 100%;
              height:100%
              margin: auto;
              display: flex;
              justify-content: space-between;
              & div{
                display:flex;
                justify-centent:center;
                align-items:center;
              }
            }
          }
        }
        & .active.search-prompt{
          display:block;
        }
    }
    & .btn{
        float:right;
        font-size:10px;
        font-weight:600;
        background-color:#200833;
        padding:9px 20px;
        border-radius:20px;
        color:white;
        cursor:pointer;
        & span{
            display:inline-block;
            font-size:12px;
            padding-right:5px;
        }
    }   
  }
`

const UploadModal = styled.div`
  width: 900px;
  height: 500px;
  border-radius: 20px;
  background-color: white;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & .close {
    position: absolute;
    right: 12px;
    top: 9px;
    cursor: pointer;
  }
  & .modal-container {
    width: 100%;
    padding: 0 8vw;
    & .click-to-select {
      text-align: center;
      font-size: 12px;
    }
    & .file-name {
      text-align: center;
      font-size: 13px;
      color: #ec0000;
      font-weight: 600;
    }
    & .upload-wrap {
      width: 100%;
      margin: 0 auto;
      border: none;
      background-color: #f4f4f4;
      border-radius: 12px;
      height: auto;
      margin-bottom: 20px;
      display: flex;
      cursor: pointer;
      padding: 20px 15px;
      box-sizing: border-box;
      & .upload-container {
        margin: auto;
        & .upload-icon {
          width: 60px;
          margin: 0 auto;
          display: block;
        }
      }
    }
    & .progress-sect {
      & .uploading {
        text-align: center;
        font-size: 22px;
        margin-bottom: 10px;
      }
      & .progress-outer {
        width: 100%;
        height: 55px;
        border-radius: 30px;
        background-color: #f4f4f4;
        margin-bottom: 10px;
        overflow: hidden;
        & .progress-inner {
          height: 100%;
          border-radius: 30px;
          background-color: #ec0000;
          font-size: 12px;
          color: white;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.3s width;
        }
      }
    }
    & .upload-btn {
      display: block;
      margin: 20px auto;
      padding: 12px 50px;
      font-size: 13px;
      color: white;
      border-radius: 30px;
      font-weight: 600;
      text-align: center;
      width: 200px;
      background-color: #200833;
      & span {
        margin-left: 10px;
      }
    }
    & .video-title {
      width: 100%;
      height: auto;
      margin-top: 10px;
      background-color: #f4f4f4;
      border-radius: 20px;
      padding: 7px 20px;
      display: flex;
      box-sizing: border-box;
      border: 2px #f4f4f4 solid;
      & span {
        font-size: 12px;
        font-weight: bold;
        margin-right: 10px;
      }
      & input {
        border: none;
        outline: none;
        flex-grow: 100;
        background-color: #f4f4f4;
      }
    }
    & .tags-picker {
      width: 100%;
      height: auto;
      margin: 20px auto;
      background-color: white;
      border-radius: 20px;
      padding: 5px 20px;
      display: flex;
      box-sizing: border-box;
      border: 2px #ec0000 solid;
      color: #ec0000;
      & .tags {
        font-size: 12px;
        font-weight: bold;
        margin-right: 10px;
      }
      & .multi-select {
        width: 100%;
        & .rs-picker-tag-wrapper {
          & .rs-tag {
            background-color: #200833;
            color: white;
          }
        }
      }
    }
  }
`

export default function SearchBar() {
  const [validSearchContent, setValidSearchContent] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [progressRate, setProgressRate] = useState(0)
  const [originalFileName, setOriginalFileName] = useState('')
  const [fileObejct, setFileObejct] = useState(null)
  const [videoTitle, setVideoTitle] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  const handleSearchInput = (e) => {
    if (e.target.value.trim()) {
      setValidSearchContent(true)
    } else {
      setValidSearchContent(false)
    }
  }

  const handleUploadModal = () => {
    setShowUploadModal(true)
  }

  const handleCloseModal = () => {
    setShowUploadModal(false)
  }

  const handleTitleInput = (e) => {
    setVideoTitle(e.target.value)
  }

  const handleUploadSubmit = () => {
    setShowProgress(true)

    const storageRef = ref(storage, `videos/${videoTitle}`)
    const uploadTask = uploadBytesResumable(storageRef, fileObejct)
    console.log(fileObejct)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgressRate(uploaded)
      },
      (error) => {
        console.log(error)
        toast.error('Something goes wrong!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'colored'
        })
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setShowLoader(true)
          fetch('/video', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: videoTitle,
              tags: selectedTags,
              url: url,
              timeStamp: new Date().getTime(),
              duration: ''
            })
          })
            .then((response) => response.json())
            .then((data) => {
              toast.success('Video uploaded successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                theme: 'colored'
              })
            })
            .catch((error) => {
              console.error('Error:', error)
            })
            .finally(() => {
              setProgressRate(0)
              setShowProgress(false)
              setOriginalFileName('')
              setVideoTitle('')
              setSelectedTags([])
              setShowLoader(false)
            })
        })
      }
    )
  }

  const handleFileSelect = (e) => {
    if (!e.currentTarget.files[0]) {
      return
    }
    setOriginalFileName(e.currentTarget.files[0].name)
    setFileObejct(e.currentTarget.files[0])
  }

  return (
    <SearchBarWrap>
      <main>
        <div className="search-outer">
          <div
            className={
              validSearchContent ? 'active search-wrap' : 'search-wrap'
            }
          >
            <span className="icon-wrap">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for training resources"
              onChange={handleSearchInput}
            />
          </div>
          <ul
            className={
              validSearchContent ? 'active search-prompt' : 'search-prompt'
            }
          >
            <li>
              <div className="search-result">
                <div>Search result</div>
                <div>tag: Web</div>
              </div>
            </li>
            <li>
              <div className="search-result">
                <div>Search result</div>
                <div>tag: Web</div>
              </div>
            </li>
            <li>
              <div className="search-result">
                <div>Search result</div>
                <div>tag: Web</div>
              </div>
            </li>
            <li>
              <div className="search-result">
                <div>Search result</div>
                <div>tag: Web</div>
              </div>
            </li>
            <li>
              <div className="search-result">
                <div>Search result</div>
                <div>tag: Web</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="btn" onClick={handleUploadModal}>
          <span>
            <CloudIcon />
          </span>
          UPLOAD A VIDEO
        </div>
      </main>
      {showUploadModal ? (
        <Backdrop>
          <UploadModal>
            <img
              src={cross}
              alt="close"
              className="close"
              onClick={handleCloseModal}
            />
            <div className="modal-container">
              {showProgress ? (
                <div
                  className="progress-sect"
                  style={{ display: showProgress ? 'grid' : 'none' }}
                >
                  <h3 className="uploading">Uploading...</h3>
                  <div className="progress-outer">
                    <div
                      className="progress-inner"
                      style={{ width: progressRate + '%' }}
                    >
                      {progressRate}%
                    </div>
                  </div>
                  {showLoader ? <Loader /> : null}
                </div>
              ) : (
                <label className="upload-wrap" htmlFor="file-select">
                  <div className="upload-container">
                    <img src={uploadImg} alt="upload" className="upload-icon" />
                    <p className="file-name">{originalFileName}</p>
                    <p className="click-to-select">
                      Click to select a .mp4 video file.
                    </p>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      id="file-select"
                      accept=".mp4,.png,.jpg"
                      style={{ display: 'none' }}
                    />
                  </div>
                </label>
              )}

              <div className="video-title">
                <span>Title:</span>
                <input
                  placeholder="Input video title here"
                  type="text"
                  onChange={handleTitleInput}
                  value={videoTitle}
                  disabled={showProgress ? true : false}
                />
              </div>
              <div className="tags-picker">
                <span className="tags">Tags:</span>
                <TagPicker
                  className="multi-select"
                  data={tags_choice}
                  onChange={(v) => setSelectedTags(v)}
                  disabled={showProgress ? true : false}
                  value={selectedTags}
                />
              </div>

              <input
                type="button"
                className="upload-btn"
                onClick={handleUploadSubmit}
                value="Upload Video"
                disabled={
                  fileObejct && videoTitle && selectedTags.length ? false : true
                }
                style={{
                  opacity:
                    fileObejct && videoTitle && selectedTags.length ? 1 : 0.5,
                  display: showProgress ? 'none' : 'block'
                }}
              />
            </div>
          </UploadModal>
        </Backdrop>
      ) : null}
    </SearchBarWrap>
  )
}
