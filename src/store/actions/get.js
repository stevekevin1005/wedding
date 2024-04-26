import { updateImagesList } from './update'

export const getImagesList = () => async dispatch => {
    try {
        const response = await fetch('https://party-line-bot.zeabur.app/api/v1/images/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const result = await response.json()
            dispatch(updateImagesList(result))
        } else {
            throw new Error('GET_IMAGES_LIST_FAILED')
        }
    } catch (error) {
        console.error()
    } finally {
    }
}
