import types from '../actions/actionTypes'

export const initState = {
    viewMode: 'grid',
    selectedImages: [],
    downloadedIds: []
}

const set = (state = initState, action) => {
    switch (action.type) {
        case types.SET_VIEW_MODE:
            return {
                ...state,
                viewMode: action.string
            }

        case types.SET_SELECTED_IMAGES:
            return {
                ...state,
                selectedImages: action.array
            }

        case types.SET_DOWNLOADED_IDS:
            return {
                ...state,
                downloadedIds: action.array
            }

        default:
            return state
    }
}

export default set
