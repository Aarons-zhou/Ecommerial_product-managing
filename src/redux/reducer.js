import { combineReducers } from 'redux'
import { localStorageUser } from '../utils/localStorage'
import { USER_LOGIN, USER_LOGOUT, SAVE_TITLE } from './action-type'

//管理用户信息的reducer
const initUser = localStorageUser.getUser()
function user(state = initUser, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.user
        case USER_LOGOUT:
            return action.user
        default:
            return state
    }
}

//管理title的reducer
function title(state = '', action) {
    switch (action.type) {
        case SAVE_TITLE:
            return action.title
        default:
            return state
    }
}
export default combineReducers({ user, title })