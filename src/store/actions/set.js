import types from './actionTypes'

export const setIsLoading = boolean => {
    return { type: types.SET_IS_LOADING, boolean }
}

export const setViewMode = string => {
    return { type: types.SET_VIEW_MODE, string }
}

export const setSelectedImages = array => {
    return { type: types.SET_SELECTED_IMAGES, array }
}

export const setDownloadedIds = array => {
    return { type: types.SET_DOWNLOADED_IDS, array }
}
