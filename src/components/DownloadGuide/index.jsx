import React from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { setDownloadedIds, setSelectedImages, setIsLoading } from '../../store/actions/set'
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
        })
        dispatch(setDownloadedIds(_downloadedIds))
        dispatch(setSelectedImages([]))
        return
        Promise.all(imageUrls.map(url => fetch(url).then(response => response.blob())))
            .then(blobs => {
                blobs.forEach((blob, index) => {
                    const imageUrl = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = imageUrl
                    link.download = `image${index + 1}.jpg`
                    link.click()
                })
            })
            .catch(error => console.error(error))
            .finally(() => {
                dispatch(setIsLoading(true))
                Promise.all(selectedImages.map(id => dispatch(postImagesMark(id))))
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(() => {
                        dispatch(setIsLoading(false))
                    })
                const _downloadedIds = [...downloadedIds]
                const _selectedImages = [...selectedImages]
                const combined = _downloadedIds.concat(_selectedImages)
                const uniqueArray = combined.filter((item, index) => combined.indexOf(item) === index)
                dispatch(setDownloadedIds(uniqueArray))
                dispatch(setSelectedImages([]))
            })
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
