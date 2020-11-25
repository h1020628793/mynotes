//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionTypes'

import * as types  from './actionTypes'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"

export const getChangeItemAction = (payload) => ({
    type: types.CHANGE_ITEM,
    payload: payload
})

export const getAddItemAction = (payload) => ({
    type: types.ADD_ITEM,
    payload: payload
})


export const getDelItemAction = (payload) => ({
    type: types.DEL_ITEM,
    payload: payload
})
/**
 * 1. 默认的action只能是一个对象,不能是处理异步请求的函数, 如果是异步请求的函数会报错:
 * Actions must be plain objects. Use custom middleware for async actions.
 * 2. 如果添加了redux-thunk中间件,action就可以是一个处理异步请求的函数了
 * 3. 返回的异步处理函数接收一个dispatch函数,在异步处理结束后再根据请求结果使用这个dispatch函数派发一个对象类型的action
 */
export const getLoadDataAction = () => {
    return async function (dispatch) {
        const result = await axios.get('http://127.0.0.1:3000')
        dispatch({
            type: types.LOAD_DATA,
            payload: result.data
        })
    }
}