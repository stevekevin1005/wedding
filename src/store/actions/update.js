import types from './actionTypes'

export const updateImagesList = array => {
    return { type: types.UPDATE_IMAGES_LIST, array }
}
