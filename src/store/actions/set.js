import types from './actionTypes'

export const setViewMode = string => {
    return { type: types.SET_VIEW_MODE, string }
}

export const setSelectedImages = array => {
    return { type: types.SET_SELECTED_IMAGES, array }
}
