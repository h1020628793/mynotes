/*
包含多个reducer函数：根据旧的state和指定的action返回一个新的state
*/
import {combineReducers} from 'redux';
import {
    AUTH_SUCCESS, 
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types';

import {getRedirectTo} from '../utils';

const initUser = {
    username:'',
    password:'',
    msg: ''   ,//错误信息
    redirectTo:''
}
// 产生user状态的reducer
function user(state = initUser,action){
    switch (action.type){
        case AUTH_SUCCESS:   //data 是user
            const {type, header} = action.data
            return {...action.data, redirectTo:getRedirectTo(type, header)}
            //或者这样写{...state, ...action.data}
            // ...state是原本的状态 ...action.data再用现在的状态把原先的给覆盖掉
        case ERROR_MSG:     //data是msg
            return {...state, msg: action.data}
        case RECEIVE_USER:     //data是user
            return action.data
        case RESET_USER:     //data是msg
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []
// 产生userlist状态的reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:  // data为userList
      return action.data
    default:
      return state
  }
}

export default combineReducers({
    user,
    userList
})
/*
向外暴露的状态的结构：{user:{}, userList:[]} 
*/

