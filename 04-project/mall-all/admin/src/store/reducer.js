// import { combineReducers} from 'redux'
import { combineReducers } from 'redux-immutable'


import {reducer as login} from 'pages/login/store'

//合并所有组件的reduer
export default combineReducers({
    login
})