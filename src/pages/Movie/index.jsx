import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Danmaku from 'rc-danmaku'
import blessings from '../../functions/blessings'
import video01 from '../../videos/video01.mp4'
import playButtonImage from '../../images/play-button.png'

function Home() {
    const video = useRef(null)
    const danmakuElementTop = useRef(null)
    const danmakuElementBottom = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handleWebSocket = () => {
        const socket = new WebSocket('wss://party-line-bot.zeabur.app/api/v1/danmaku/ws')
        socket.onopen = event => {
            console.log('connect:', event)
        }
        socket.onmessage = event => {
            const message = event.data
            if (danmakuElementBottom.current) {
                danmakuElementBottom.current.push(message, { color: '#fff' })
            }
        }
    }

    const handleDanmaku = () => {
        const danmakuWrapperBottom = new Danmaku('#danmakuWrapperBottom', { minGapWidth: 40, rowHeight: 36 })
        danmakuElementBottom.current = danmakuWrapperBottom
    }

    const handlePlayVideo = () => {
        if (!isPlaying) {
            video.current.play()
            setIsPlaying(true)
        } else {
            video.current.pause()
            setIsPlaying(false)
        }
    }

    useEffect(() => {
        handleWebSocket()
        handleDanmaku()
    }, [])

    return (
        <div className="movie_page_wrapper">
            <div className="danmaku_outerbox movie">
                {/* <div id="danmakuWrapperTop" className="danmaku_wrapper" ref={danmakuElementTop} /> */}
            </div>
            <div className="movie_video_container">
                <button
                    className="test_message_btn"
                    onClick={() => {
                        if (danmakuElementBottom.current) {
                            const randomIndex = Math.floor(Math.random() * blessings.length)
                            const blessingMessage = blessings[randomIndex]
                            danmakuElementBottom.current.push(blessingMessage, { color: '#fff' })
                        }
                    }}>
                    隨機發送一則訊息(測試用，正式版會移除)
                </button>
                <video className="video movie" ref={video} playsInline loop onClick={handlePlayVideo}>
                    <source src={video01} />
                </video>
            </div>
            {!isPlaying && (
                <div className="play_button" onClick={handlePlayVideo}>
                    <img src={playButtonImage} />
                </div>
            )}
            <div className="danmaku_outerbox movie">
                <div id="danmakuWrapperBottom" className="danmaku_wrapper" ref={danmakuElementBottom} />
            </div>
        </div>
    )
}

export default Home
