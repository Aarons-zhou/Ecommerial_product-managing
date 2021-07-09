/*
    用于发送网络请求的api
*/
import request from './request'

const URL_BASE = 'http://159.75.128.32:5000'

//登录账号
export const reqLogin = data => request(URL_BASE + '/api/user/login', data, 'POST')

//获取IP地址
export const reqIP = data => request('https://restapi.amap.com/v3/ip', data)

//根据IP地址获取天气信息
export const reqWeather = data => request('https://restapi.amap.com/v3/weather/weatherInfo', data)

//查看分类
export const reqRetrieveCategory = parentId => request(URL_BASE + '/api/category/list/' + parentId)

//添加分类
export const reqCreateCategory = data => request(URL_BASE + '/api/category/add', data, 'POST')

//修改分类
export const reqUpdateCategory = data => request(URL_BASE + '/api/category/update', data, 'PUT')

//获取商品分页列表
export const reqProductList = data => request(URL_BASE + '/api/products/list', data, 'POST')

//根据名称搜索产品分页列表
export const reqProductSearchByName = data => request(URL_BASE + '/api/products/searchByName', data)

//根据描述搜索产品分页列表
export const reqProductSearchByDesc = data => request(URL_BASE + '/api/products/searchByDesc/' + data.join('/'))

//商品上架下架
export const reqProductStatusUpdate = (id, data) => request(URL_BASE + '/api/products/updateStatus/' + id, data, 'PUT')

//修改商品
export const reqProductUpdate = (id, data) => request(URL_BASE + '/api/products/updateProduct/' + id, data, 'PUT')

//新增商品
export const reqProductCreate = data => request(URL_BASE + '/api/products/addProduct', data, 'POST')

//删除图片
export const reqDeleteImage = data => request(URL_BASE + '/manage/img/delete', data, 'POST')

//获取角色列表
export const reqRoleList = data => request(URL_BASE + '/api/role/getRoles', data)

//添加角色
export const reqCreateRole = data => request(URL_BASE + '/api/role/createRoleByName', data, 'POST')

//设置角色权限
export const reqUpdateRole = (id, data) => request(URL_BASE + '/api/role/updateRole/' + id, data, 'PUT')

//获取用户列表
export const reqUserList = data => request(URL_BASE + '/api/user/getUsers', data)

//修改用户信息
export const reqUpdateUser = (id, data) => request(URL_BASE + '/api/user/update/' + id, data, 'PUT')

//添加用户信息
export const reqCreateUser = data => request(URL_BASE + '/api/user/add', data, 'POST')

//删除用户信息
export const reqDeleteUser = data => request(URL_BASE + '/api/user/delete/' + data, '', 'DELECT')