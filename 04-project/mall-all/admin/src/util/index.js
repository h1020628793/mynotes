export const saveUsername = (username)=>{
    window.localStorage.setItem('username',username)
}

export const getUsername = () => {
    return window.localStorage.getItem('username')
}

export const removeUsername = () => {
    window.localStorage.removeItem('username')
}

export const goLogin = ()=>{
    window.location.href = '/login'
}

export const goHome = () => {
    window.location.href = '/'
}

