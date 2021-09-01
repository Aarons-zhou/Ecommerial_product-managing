import { message } from 'antd'
import { USER_LOGIN, USER_LOGOUT, SAVE_TITLE, SAVE_PRODUCT } from './action-type'
import { reqLogin, reqRoleList } from '../api'
import { setUser_l, setUser_s } from '../utils/localStorage'

//登录成功的同步action
const loginSync = user => ({ type: USER_LOGIN, user })
//登录的异步action
export const login = (name, password) => {
    return async dispatch => {
        const loginResult = await reqLogin({ name, password })
        const RoleListResult = await reqRoleList()
        const { data } = loginResult
        if (loginResult.status === 0 && RoleListResult.status === 0) {
            const roleList = RoleListResult.data
            const { roleId } = data
            const role = roleList.filter(item => item.id === roleId * 1)
            const menus = role[0].menus.split(',')
            setUser_l({
                ...data,
                menus
            })                                          //保存到localStorage
            dispatch(loginSync({
                ...data,
                menus
            }))                                         //分发action
        } else {
            message.error('账号或密码输入不正确')
        }
    }
}

//临时登录的异步aciton
export const tempLogin = () => {
    return dispatch => {
        const time = Date.now()
        const user = {
            name: '游客' + time,
            menus: ['/home', '/products', '/category', '/product', '/role', '/user', '/chart/bar', '/chart/line', '/chart/pie']
        }
        setUser_s(user)                                          //保存到localStorage
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
        dispatch(saveTitle('首页'))
    }
}

//保存title的同步action
export const saveTitle = title => ({ type: SAVE_TITLE, title })

//保存商品信息的同步action
export const saveProduct = product => ({ type: SAVE_PRODUCT, product })