// import { combineReducers} from 'redux'
import { combineReducers } from 'redux-immutable'


import {reducer as todolist} from '../pages/todolist/store'
import { reducer as head }  from '../pages/head/store'

//合并所有组件的reduer
export default combineReducers({
    todolist,
    head
})