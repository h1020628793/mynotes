import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import reducer from './reducer'

/**
 * createStore的主要作用:
 * 1. 给store指定reducer,今后派发的action就会被转发到这个reducer里面
 * 2. 初始化store里面的state,会派发一个初始化的action(随机每次都会变化)到reducer,reducer会返回一个默认的初始化state
 */
const store = createStore(reducer, applyMiddleware(thunk))

export default store