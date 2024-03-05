import React, { useEffect, useRef } from 'react'
import './style.scss'

function Home() {
    const video = useRef(null)

    const handleWebSocket = () => {
        const socket = new WebSocket('wss://party-line-bot.zeabur.app/api/v1/danmaku/ws')
        socket.onopen = event => {
            console.log('connect:', event)
        }
        socket.onmessage = event => {
            console.log(event.data)
        }
    }

    const handlePlayVideo = () => {
        video.current.play()
    }

    useEffect(() => {
        handleWebSocket()
    }, [])

    return (
        <div className="home_wrapper">
            <div className="bullet_screen">
                <p className="text" data-stroke="測試 Sphinx of black quartz, judge my vow.">
                    測試 Sphinx of black quartz, judge my vow.
                </p>
            </div>
            <video className="video" ref={video} playsInline loop onClick={handlePlayVideo}>
                <source src="https://cdn.chowsangsang.com/dfs/ivCssModelImages/92983/2022/1/14/a0e8f5e62a133e734edcd90c280601e1.mp4" />
            </video>
        </div>
    )
}

export default Home
