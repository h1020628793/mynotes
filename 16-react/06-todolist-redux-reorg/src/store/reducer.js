import { combineReducers} from 'redux'


import todolist from '../pages/todolist/store/reducer'
import nav  from '../pages/nav/store/reducer'

//合并所有组件的reduer
export default combineReducers({
    todolist,
    nav
})