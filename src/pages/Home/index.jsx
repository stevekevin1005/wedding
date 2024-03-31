import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

function Home() {
    const video = useRef(null)
    const bulletElement = useRef(null)
    const [texts, setTexts] = useState([])

    const handleWebSocket = () => {
        const socket = new WebSocket('wss://party-line-bot.zeabur.app/api/v1/danmaku/ws')
        socket.onopen = event => {
            console.log('connect:', event)
        }
        socket.onmessage = event => {
            const text = event.data
            const array = [...texts]
            array.push(text)
            setTexts(array)
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
            <div className="bullet_screen" ref={bulletElement}>
                {texts.map((text, index) => (
                    <p key={index} className="text" data-stroke={text}>
                        {text}
                    </p>
                ))}
            </div>
            <video className="video" ref={video} playsInline loop onClick={handlePlayVideo}>
                <source src="https://cdn.chowsangsang.com/dfs/ivCssModelImages/92983/2022/1/14/a0e8f5e62a133e734edcd90c280601e1.mp4" />
            </video>
        </div>
    )
}

export default Home
