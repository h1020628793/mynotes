/*
包含多个action creator：包括异步action和同步action
*/
import {
    AUTH_SUCCESS, 
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'
//每一个action-type都对应一个同步的action

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api'

//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
//错误信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//接受用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

//注册的异步action, return的是一个函数
export const register = (user) => {
    const {username, password, type} = user
    //做表单的前台检查，如果不容过，分发一个errorMsg的同步action
    if(!username){
        return errorMsg('用户名必须指定')
    }
    if(password!==password){
        return errorMsg('两次输入的密码不一样')
    }
    //表单数据合法，返回一个发送ajax异步请求的action函数

    return async dispatch => {
        //发送注册的异步ajax请求,返回的是一个promise
        // const promise = reqRegister(user)  太过麻烦
        // promise.then(response => {
        //     const result = response.data //{code: 0/1, data:user, msg:''}
        // }) 
        const response = await reqRegister({username, password, type})
        const result = response.data
        //无论成功失败之后都要分发同步的action
        if(result.code === 0){ //成功
            //分发成功的action
            dispatch(authSuccess(result.data))
        } else {    //失败
            //分发失败的action
            dispatch(errorMsg(result.msg))
        }

    }
}

//登录的异步action, return的是一个函数
export const login = (user) => {
    const {username, password} = user
    //做表单的前台检查，如果不容过，分发一个errorMsg的同步action
    if(!username){
        return errorMsg('用户名必须指定')
    } else if(!password){
        return errorMsg('密码必须指定')
    }
    //表单数据合法，返回一个发送ajax异步请求的action函数

    return async dispatch => {
        //发送注册的异步ajax请求,返回的是一个promise
        // const promise = reqLogin(user)  太过麻烦
        // promise.then(response => {
        //     const result = response.data //{code: 0/1, data:user, msg:''}
        // }) 
        const response = await reqLogin(user)
        const result = response.data
        //无论成功失败之后都要分发同步的action
        if(result.code === 0){ //成功
            //分发成功的action
            dispatch(authSuccess(result.data))
        } else {    //失败
            //分发失败的action
            dispatch(errorMsg(result.msg))
        }

    }
}

//更新用户的异步action, return的是一个函数
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code===0){
            //成功,分发同步action
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户的异步action
export const getUser = () => {
    return async dispatch => {
        //执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){ //成功
            dispatch(receiveUser(result.data))
        }else { //失败
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
    return async dispatch => {
      // 执行异步ajax请求
      const response = await reqUserList(type)
      const result = response.data
      // 得到结果后, 分发一个同步action
      if(result.code===0) {
        dispatch(receiveUserList(result.data))
      }
    }
  }