import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { setViewMode } from '../../store/actions/set'
import { getImagesList } from '../../store/actions/get'
import { isArray } from '../../functions/common'
import WindowIcon from '@mui/icons-material/Window'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import ReplayIcon from '@mui/icons-material/Replay'
import wedding_banner from '../../images/banner.png'
import ImageBox from '../../components/ImageBox'
import DownloadGuide from '../../components/DownloadGuide'
import Loading from '../../components/Loading'

function ImageList() {
    const dispatch = useDispatch()
    const viewMode = useSelector(state => state.set.viewMode)
    const imagesList = useSelector(state => state.update.imagesList)
    const downloadedIds = useSelector(state => state.set.downloadedIds)

    const viewModeList = [{ name: 'grid', icon: <ReplayIcon style={{ fontSize: 36 }} /> }]

    useEffect(() => {
        dispatch(getImagesList())
    }, [])

    return (
        <div className="image_list_page_wrapper">
            <div className="content">
                <div className="top_banner">
                    <img className="image_banner" src={wedding_banner} />
                    <div className="description_content">
                        <h1 className="title">Steve & Yen Wedding</h1>
                        <p className="subtitle">請在此長按儲存照片並使用拍立得列印</p>
                    </div>
                </div>
                <div className="view_mode_content">
                    {viewModeList.map((data, index) => (
                        <div
                            key={index}
                            className={`view_button ${viewMode === data.name ? 'active' : ''}`}
                            onClick={() => {
                                dispatch(getImagesList())
                            }}
                        >
                            {data.icon}
                        </div>
                    ))}
                </div>
                <div className="list_content">
                    {isArray(imagesList) &&
                        imagesList.map((data, index) => (
                            <ImageBox
                                key={index}
                                id={data.id}
                                path={data.path}
                                name={data.name}
                                serial={data.serial}
                                disabled={downloadedIds.includes(data.id)}
                            />
                        ))}
                </div>
                <DownloadGuide />
            </div>
            <Loading />
        </div>
    )
}

export default ImageList
