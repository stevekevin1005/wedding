import React, { useEffect, useState } from 'react'
import './style.css'
import wedding_banner from '../../images/wedding-banner.png'

function ImageList() {
    const [list, setList] = useState([
        {
            id: 0,
            name: 'string',
            path: 'string'
        }
    ])

    const getImageList = async () => {
        try {
            const response = await fetch('https://party-line-bot.zeabur.app/api/v1/images/list', { method: 'GET' })
            if (response.ok) {
                const result = await response.json()
                setList(result)
            }
        } catch (error) {
        } finally {
        }
    }

    const postMark = async id => {
        try {
            const object = { id }
            const response = await fetch('https://party-line-bot.zeabur.app/api/v1/images/mark', {
                method: 'POST',
                body: JSON.stringify(object)
            })
            if (response.ok) {
                // success evnet
            } else {
                const errorMessage = await response.text()
                console.log('error message:', errorMessage)
            }
        } catch (error) {
        } finally {
        }
    }

    const handleImageOrientation = e => {
        const { naturalWidth, naturalHeight } = e.target
        if (naturalHeight > naturalWidth) e.target.classList.add('vertical')
    }

    useEffect(() => {
        getImageList()
    }, [])

    return (
        <div className="image_list_page_wrapper">
            <div className="content">
                <div className="top_banner shadow">
                    <img className="image_banner" src={wedding_banner} />
                    <div className="description_content">
                        <h1 className="title">Lilly & Steve Wedding</h1>
                        <p>請在此下載您的照片</p>
                    </div>
                </div>
                <div className="list_content">
                    {list &&
                        Array.isArray(list) &&
                        list.map((data, index) => (
                            <a
                                key={index}
                                className="image_box_wrapper"
                                download
                                href={`https://party-line-bot.zeabur.app/${data.path}`}
                                onClick={() => {
                                    postMark(data.id)
                                }}
                            >
                                <div className="image_box_content shadow">
                                    <div className="tag">已下載</div>
                                    <div className="image_wrap">
                                        <img
                                            className="image"
                                            src={`https://party-line-bot.zeabur.app/${data.path}`}
                                            onLoad={handleImageOrientation}
                                        />
                                    </div>
                                    <p className="name">{data.name}</p>
                                </div>
                            </a>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ImageList
