import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer'

const middlewares = []

middlewares.push(thunk)

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
    })
    middlewares.push(logger);
}

/**
 * createStore的主要作用:
 * 1. 初始化store里面的state,在创建时调用一次reducer,action的类型时一个随机每次都会变化的字符串,reducer会返回一个默认的初始化state
 * 2. 给store指定reducer,今后一旦有action派发到store,store就会调用这个reducer
 */
const store = createStore(reducer, applyMiddleware(...middlewares))

export default store