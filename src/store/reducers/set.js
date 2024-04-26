import types from '../actions/actionTypes'

export const initState = {
    viewMode: 'grid',
    selectedImages: []
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

        default:
            return state
    }
}

export default set
