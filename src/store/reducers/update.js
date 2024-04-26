import types from '../actions/actionTypes'

export const initState = {
    imagesList: null
}

const update = (state = initState, action) => {
    switch (action.type) {
        case types.UPDATE_IMAGES_LIST:
            return {
                ...state,
                imagesList: action.array
            }

        default:
            return state
    }
}

export default update
