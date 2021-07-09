import { message } from 'antd'
import { USER_LOGIN, USER_LOGOUT, SAVE_TITLE } from './action-type'
import { reqLogin, reqRoleList } from '../api'
import { localStorageUser } from '../utils/localStorage'

//登录成功的同步action
const loginSync = user => ({ type: USER_LOGIN, user })
//登录的异步action
export const login = (name, password) => {
    return async dispatch => {
        const loginResult = await reqLogin({ name, password })
        const RoleListResult = await reqRoleList()
        const { data, msg } = loginResult
        if (loginResult.status === 0 && RoleListResult.status === 0) {
            const roleList = RoleListResult.data
            const { roleId } = data
            const role = roleList.filter(item => item.id === roleId * 1)
            const menus =  role[0].menus.split(',')
            localStorageUser.setUser({
                ...data,
                menus
            })                                          //保存到localStorage
            dispatch(loginSync({
                ...data,
                menus
            }))                                         //分发action
        } else {
            message.error(msg)
        }
    }
}

//临时登录的异步aciton
export const tempLogin = () => {
    return dispatch => {
        const time = Date.now()
        const user = {
            username: '游客' + time
        }
        dispatch(loginSync(user))
    }
}

//退出登录的同步action
const logoutSync = () => ({ type: USER_LOGOUT, user: null })
//退出登录的异步action
export const logout = () => {
    return dispatch => {
        localStorageUser.clearUser()                    //清空localStorage
        dispatch(logoutSync())                          //分发action
    }
}

//

//保存title的同步action
export const saveTitle = title => ({ type: SAVE_TITLE, title })
