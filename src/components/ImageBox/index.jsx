import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedImages } from '../../store/actions/set'
import DoneIcon from '@mui/icons-material/Done'

function ImageBox({ id, path, name, serial, disabled }) {
    const dispatch = useDispatch()
    const selectedImages = useSelector(state => state.set.selectedImages)

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
        <div className="image_box_wrapper">
            <div
                className={`image_box_content ${selectedImages.includes(id) ? 'selected' : ''} ${
                    disabled ? 'disabled' : ''
                }`}
                onClick={() => handleImage(id)}
            >
                <div className="image_wrap">
                    {disabled && <div className="printed_tag">已列印</div>}
                    {selectedImages.includes(id) && (
                        <div className="selected_tag">
                            <DoneIcon />
                        </div>
                    )}
                    <img className="image" src={`https://party-line-bot.zeabur.app/${path}`} />
                </div>
                <div className="desc_content">
                    <div className="serial">
                        <p className="subtitle">相片編號:</p>
                        <p className="ellipsis_text">{serial}</p>
                    </div>
                    <div className="name">
                        <p className="subtitle">上傳者:</p>
                        <p className="ellipsis_text">{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageBox
