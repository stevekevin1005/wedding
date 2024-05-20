import React from 'react'
import './style.css'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'

function Loading() {
    const isLoading = useSelector(state => state.set.isLoading)

    return (
        <div className={`loading_wrapper ${isLoading ? 'active' : ''}`}>
            <ReactLoading type="spinningBubbles" color="var(--primary-color)" width={66} />
        </div>
    )
}

export default Loading
