import { combineReducers } from 'redux'
import set from './set'
import update from './update'

const reducers = combineReducers({
    set,
    update
})

export default reducers
