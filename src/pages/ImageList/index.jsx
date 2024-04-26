import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { setViewMode } from '../../store/actions/set'
import { getImagesList } from '../../store/actions/get'
import { isArray } from '../../functions/common'
import WindowIcon from '@mui/icons-material/Window'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import wedding_banner from '../../images/wedding-banner.png'
import ImageBox from '../../components/ImageBox'
import DownloadGuide from '../../components/DownloadGuide'

function ImageList() {
    const dispatch = useDispatch()
    const viewMode = useSelector(state => state.set.viewMode)
    const imagesList = useSelector(state => state.update.imagesList)

    const viewModeList = [
        { name: 'grid', icon: <WindowIcon style={{ fontSize: 36 }} /> },
        { name: 'full', icon: <SquareRoundedIcon style={{ fontSize: 36 }} /> }
    ]

    useEffect(() => {
        dispatch(getImagesList())
    }, [])

    return (
        <div className="image_list_page_wrapper">
            <div className="content">
                <div className="top_banner shadow">
                    <img className="image_banner" src={wedding_banner} />
                    <div className="description_content">
                        <h1 className="title">Steve & Yen Wedding</h1>
                        <p>請在此選取照片並下載後使用拍立得列印</p>
                    </div>
                </div>
                <div className="view_mode_content">
                    {viewModeList.map((data, index) => (
                        <div
                            key={index}
                            className={`view_button ${viewMode === data.name ? 'active' : ''}`}
                            onClick={() => {
                                dispatch(setViewMode(data.name))
                            }}
                        >
                            {data.icon}
                        </div>
                    ))}
                </div>
                <div className="list_content">
                    {isArray(imagesList) &&
                        imagesList.map((data, index) => (
                            <ImageBox key={index} id={data.id} path={data.path} name={data.name} disabled={true} />
                        ))}
                </div>
                <DownloadGuide />
            </div>
        </div>
    )
}

export default ImageList
