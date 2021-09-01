import { combineReducers } from 'redux'
import { getUser_l, getUser_s } from '../utils/localStorage'
import { USER_LOGIN, USER_LOGOUT, SAVE_TITLE, SAVE_PRODUCT } from './action-type'

//管理用户信息的reducer
const initUser = getUser_l() || getUser_s()
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
function title(state = '首页', action) {
    switch (action.type) {
        case SAVE_TITLE:
            return action.title
        default:
            return state
    }
}

//管理商品页的二级页面的初始信息
function product(state = {}, aciton) {
    switch (aciton.type) {
        case SAVE_PRODUCT:
            return aciton.product
        default:
            return state
    }
}

export default combineReducers({ user, title, product })