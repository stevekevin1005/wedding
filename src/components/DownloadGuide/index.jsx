import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { isArray } from '../../functions/common'

function DownloadGuide() {
    const selectedImages = useSelector(state => state.set.selectedImages)

    return (
        <div className={`download_guide_wrapper shadow ${isArray(selectedImages) ? 'active' : ''}`}>
            <div className="selected_text">已選取 {selectedImages.length} 張</div>
            <button className="download_btn">下載圖片</button>
        </div>
    )
}

export default DownloadGuide
