import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Danmaku from 'rc-danmaku'
import blessings from '../../functions/blessings'
import video01 from '../../videos/video01.mp4'
import playButtonImage from '../../images/play-button.png'

function Home() {
    const video = useRef(null)
    const danmakuElement = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handleWebSocket = () => {
        const socket = new WebSocket('wss://party-line-bot.zeabur.app/api/v1/danmaku/ws')
        socket.onopen = event => {
            console.log('connect:', event)
        }
        socket.onmessage = event => {
            const message = event.data
            if (danmakuElement.current) {
                danmakuElement.current.push(message, { color: '#fff' })
            }
        }
    }

    const initDanmaku = () => {
        const danmakuWrapper = new Danmaku('#danmakuWrapper', { minGapWidth: 60 })
        danmakuElement.current = danmakuWrapper
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
        initDanmaku()
    }, [])

    return (
        <div className="home_page_wrapper">
            <button
                className="test_message_btn"
                onClick={() => {
                    if (danmakuElement.current) {
                        const randomIndex = Math.floor(Math.random() * blessings.length)
                        const blessingMessage = blessings[randomIndex]
                        danmakuElement.current.push(blessingMessage, { color: '#000' })
                    }
                }}
            >
                隨機發送一則訊息(測試用)
            </button>
            <div className="danmaku_outerbox">
                <div id="danmakuWrapper" className="danmaku_wrapper" ref={danmakuElement} />
            </div>
            <video className="video" ref={video} playsInline loop onClick={handlePlayVideo}>
                <source src={video01} />
            </video>
            {!isPlaying && (
                <div className="play_button" onClick={handlePlayVideo}>
                    <img src={playButtonImage} />
                </div>
            )}
        </div>
    )
}

export default Home
