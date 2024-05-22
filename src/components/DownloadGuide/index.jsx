import React from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedImages } from '../../store/actions/set'
import { postImagesMark } from '../../store/actions/post'
import { isArray } from '../../functions/common'

function DownloadGuide() {
    const dispatch = useDispatch()
    const imagesList = useSelector(state => state.update.imagesList)
    const selectedImages = useSelector(state => state.set.selectedImages)
    const downloadedIds = useSelector(state => state.set.downloadedIds)

    const handleDownload = () => {
        if (!isArray(selectedImages)) return
        const imageUrls = []
        const _downloadedIds = [...downloadedIds]
        selectedImages.forEach(id => {
            const path = imagesList.find(item => item.id === id)?.path
            const url = `https://party-line-bot.zeabur.app/${path}`
            imageUrls.push(url)
            _downloadedIds.push(id)
            dispatch(postImagesMark(id))
        })
        dispatch(setSelectedImages([]))
    }

    return (
        <div className={`download_guide_wrapper shadow ${isArray(selectedImages) ? 'active' : ''}`}>
            <div className="selected_text">已選取 {selectedImages.length} 張</div>
            <button className="download_btn" onClick={handleDownload}>
                標記為列印
            </button>
        </div>
    )
}

export default DownloadGuide
