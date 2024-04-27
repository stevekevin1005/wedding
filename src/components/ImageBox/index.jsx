import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedImages } from '../../store/actions/set'

function ImageBox({ id, path, name, downloaded, disabled }) {
    const dispatch = useDispatch()
    const viewMode = useSelector(state => state.set.viewMode)
    const selectedImages = useSelector(state => state.set.selectedImages)

    const _orientation = event => {
        const { naturalWidth, naturalHeight } = event.target
        if (naturalHeight > naturalWidth) event.target.classList.add('vertical')
    }

    const handleImage = id => {
        const _selectedImages = [...selectedImages]
        const indexOfImages = _selectedImages.findIndex(data => data === id)
        if (indexOfImages === -1) {
            _selectedImages.push(id)
        } else {
            _selectedImages.splice(indexOfImages, 1)
        }
        dispatch(setSelectedImages(_selectedImages))
    }

    return (
        <div className={`image_box_wrapper ${viewMode}`}>
            <div
                className={`image_box_content shadow ${selectedImages.includes(id) ? 'selected' : ''} ${
                    disabled ? 'disabled' : ''
                }`}
                onClick={() => handleImage(id)}
            >
                {disabled ? <div className="tag">已列印</div> : downloaded ? <div className="tag">已下載</div> : null}
                <div className="image_wrap">
                    <img className="image" src={`https://party-line-bot.zeabur.app/${path}`} onLoad={_orientation} />
                </div>
                <p className="name">{name}</p>
            </div>
        </div>
    )
}

export default ImageBox
