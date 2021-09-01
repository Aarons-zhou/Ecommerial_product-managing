//操作store中user相关
const setUser_l = data => localStorage.setItem('user', JSON.stringify(data))
const getUser_l = () => JSON.parse(localStorage.getItem('user'))
const clearUser_l = () => localStorage.removeItem('user')
const setUser_s = data => sessionStorage.setItem('user', JSON.stringify(data))
const getUser_s = () => JSON.parse(sessionStorage.getItem('user'))
const clearUser_s = () => sessionStorage.removeItem('user')

export { setUser_l, getUser_l, clearUser_l, setUser_s, getUser_s, clearUser_s }