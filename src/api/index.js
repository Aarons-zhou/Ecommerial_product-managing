/*
    用于发送网络请求的api
*/
import request from './request'

const URL_BASE = 'http://159.75.128.32:5000'

//登录账号
export const reqLogin = data => request(URL_BASE+'/api/user/login',data,'POST')

//获取IP地址
export const reqIP = data => request('https://restapi.amap.com/v3/ip',data)

//根据IP地址获取天气信息
export const reqWeather = data => request('https://restapi.amap.com/v3/weather/weatherInfo',data)

//查看分类
export const reqRetrieveCategory = parentId => request(URL_BASE+'/api/category/list/'+parentId)

//添加分类
export const reqCreateCategory = data => request(URL_BASE+'/api/category/add',data,'POST')

//修改分类
export const reqUpdateCategory = data => request(URL_BASE+'/api/category/update',data,'PUT')

//获取商品分页列表
export const reqProductList = data => request(URL_BASE+'/manage/product/list',data)

//根据ID/Name搜索产品分页列表
export const reqProductSearch = data => request(URL_BASE+'/manage/product/search',data)

//商品上架下架
export const reqProductStatusUpdate = data => request(URL_BASE+'/manage/product/updateStatus',data,'POST')

//添加商品
export const reqProductCreate = data => request(URL_BASE+'/manage/product/add',data,'POST')

//删除图片
export const reqDeleteImage = data => request(URL_BASE+'/manage/img/delete',data,'POST')

//获取角色列表
export const reqRoleList = data => request(URL_BASE+'/manage/role/list',data)

//添加角色
export const reqAddRole = data => request(URL_BASE+'/manage/role/add',data,'POST')

//设置角色权限
export const reqUpdateRole = data => request(URL_BASE+'/manage/role/update',data,'POST')

//获取用户列表
export const reqUserList = data => request(URL_BASE+'/manage/user/list',data)

//修改用户信息
export const reqUpdateUser = data => request(URL_BASE+'/manage/user/update',data,'POST')

//添加用户信息
export const reqAddUser = data => request(URL_BASE+'/manage/user/add',data,'POST')

//删除用户信息
export const reqDeleteUser = data => request(URL_BASE+'/manage/user/delete',data,'POST')