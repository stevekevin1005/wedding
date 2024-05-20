import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getImagesList } from '../../store/actions/get'
import { setSelectedImages } from '../../store/actions/set'
import { isArray } from '../../functions/common'
import ImageBox from '../../components/ImageBox'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ReplayIcon from '@mui/icons-material/Replay'
import CameraIcon from '@mui/icons-material/Camera'
import PrintIcon from '@mui/icons-material/Print'
import DownloadGuide from '../../components/DownloadGuide'
import Loading from '../../components/Loading'

function ImageList() {
    const dispatch = useDispatch()
    const imagesList = useSelector(state => state.update.imagesList)
    const [isPrinted, setIsPrinted] = useState(false)

    useEffect(() => {
        dispatch(getImagesList())
    }, [])

    return (
        <div className="image_list_page_wrapper">
            <header className="header shadow">
                <div className="banner shadow">
                    <div>
                        <h1 className="banner_title">Steve & Yen Wedding</h1>
                        <p className="banner_subtitle">長按儲存照片並使用拍立得列印</p>
                    </div>
                    <div
                        className="reload_btn"
                        onClick={() => {
                            dispatch(getImagesList())
                        }}
                    >
                        <ReplayIcon style={{ fontSize: 20, color: '#000' }} />
                    </div>
                </div>
                <div className="options_wrap">
                    <div
                        className={`option_btn ${!isPrinted ? 'active' : ''}`}
                        onClick={() => {
                            setIsPrinted(false)
                        }}
                    >
                        <CameraIcon style={{ fontSize: 32 }} />
                        <p>相簿</p>
                    </div>
                    <div
                        className={`option_btn ${isPrinted ? 'active' : ''}`}
                        onClick={() => {
                            setIsPrinted(true)
                            dispatch(setSelectedImages([]))
                        }}
                    >
                        <PrintIcon style={{ fontSize: 32 }} />
                        <p>已列印</p>
                    </div>
                </div>
            </header>
            <main className="main_wrap">
                <ResponsiveMasonry columnsCountBreakPoints={{ 485: 2, 767: 3, 991: 4 }}>
                    <Masonry gutter="24px">
                        {isArray(imagesList) &&
                            imagesList.map(
                                (data, index) =>
                                    isPrinted === data.status && (
                                        <ImageBox
                                            key={index}
                                            id={data.id}
                                            path={data.path}
                                            name={data.name}
                                            serial={data.serial}
                                            disabled={data.status}
                                        />
                                    )
                            )}
                    </Masonry>
                </ResponsiveMasonry>
            </main>
            <DownloadGuide />
            <Loading />
        </div>
    )
}

export default ImageList
