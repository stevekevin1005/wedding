import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Danmaku from 'rc-danmaku'
import playButtonImage from '../../images/play-button.png'

function Home() {
    const video = useRef(null)
    const danmakuElement = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const danmakuTextColor = '#000'

    const handleWebSocket = () => {
        const socket = new WebSocket('wss://party-line-bot.zeabur.app/api/v1/danmaku/ws')
        socket.onopen = event => {
            console.log('connect:', event)
        }
        socket.onmessage = event => {
            const message = event.data
            if (danmakuElement.current) {
                danmakuElement.current.push(message, { color: danmakuTextColor })
            }
        }
    }

    const initDanmaku = () => {
        const danmakuWrapper = new Danmaku('#danmakuWrapper', { minGapWidth: 60, rowHeight: 60 })
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
            <div className="danmaku_outerbox">
                <div id="danmakuWrapper" className="danmaku_wrapper" ref={danmakuElement} />
            </div>
            <video className="video" ref={video} playsInline loop onClick={handlePlayVideo}>
                <source src="https://steveyanwedding.s3.ap-northeast-1.amazonaws.com/06.15+%E5%A9%9A%E7%B4%97%E6%8A%95%E5%B0%84%E5%BD%B1%E7%89%87.mp4" />
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
