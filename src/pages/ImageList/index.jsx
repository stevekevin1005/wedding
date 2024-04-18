import React, { useEffect, useState } from 'react'
import './style.css'

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

    const handlePostMark = async id => {
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

    useEffect(() => {
        getImageList()
    }, [])

    return (
        <div className="image_list_page_wrapper">
            <div className="list">
                {list &&
                    Array.isArray(list) &&
                    list.map((data, index) => (
                        <div
                            key={index}
                            className="image_box"
                            onClick={() => {
                                handlePostMark(data.id)
                            }}>
                            <div className="tag">已下載</div>
                            <div className="image_wrap">
                                <img src={`https://party-line-bot.zeabur.app/${data.path}`} />
                            </div>
                            <p>{data.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ImageList
