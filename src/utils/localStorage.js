//操作store中user相关
export const localStorageUser = {
    setUser: data => localStorage.setItem('user', JSON.stringify(data)),
    getUser: () => JSON.parse(localStorage.getItem('user')),
    clearUser: () => localStorage.removeItem('user')
}