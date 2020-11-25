//import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionTypes'
import * as types from './actionTypes'

import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({ list: [], task: '' })

/**
 * 1. reducer是一个纯函数(固定的输入必须是一个固定的输出),保证有固定输出的方法是不要在函数中使用Date.now或者Math.random这些方法生成数据
 * 2. reducer主要是根据上一次的state和最新的action用来处数据
 * 3. reducer必须要返回一个新的state的对象,因为state应该有store来统一管理
 * 4. store根据返回的新的state来更新store里面的state,组件使用getState方法来获取store里面的state
 * 5. action是一个对象,存储了操作类型和必要的参数,必须保证action的类型是唯一的
 */
function reducer(state = defaultState, action) {
    //复制一个新的state
    //let newState = JSON.parse(JSON.stringify(state))

    if (action.type == types.LOAD_DATA) {//初始化加载网络数据
        return state.set('list',action.payload)
    }
    if (action.type == types.CHANGE_ITEM) {//修改input框的数据
        return state.set('task', action.payload)
    }
    if (action.type == types.ADD_ITEM) {//添加项目
        const item = {
            id: action.payload,
            task: state.get('task')
        }
        const list = [...state.get('list')]
        list.push(item)
        return state.merge({
            list,
            task:''
        })
    }
    if (action.type == types.DEL_ITEM) {
        const list = [...state.get('list')].filter(item => action.payload != item.id)
        return state.set('list', list)
    }
    //返回一个新的state 
    //return newState
    return state
}

export default reducer