import { getImagesList } from './get'

export const postImagesMark = id => async dispatch => {
    try {
        const data = { id }
        const response = await fetch('https://party-line-bot.zeabur.app/api/v1/images/mark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            dispatch(getImagesList())
        } else {
            const errorMessage = await response.text()
            throw new Error('POST_MARK_FAILED ' + errorMessage)
        }
    } catch (error) {
        console.error(error)
    } finally {
    }
}
