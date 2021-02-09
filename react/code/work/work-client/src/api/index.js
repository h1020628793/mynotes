/*
包含了n个接口请求的函数模块
*/
//一般获取查询数据用get, 隐藏,修改或者提交数据用post
//需要接收用户名，密码和类型等用户信息,每个user包含数据不一样
import ajax from './ajax';

//注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')

//登录接口
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')

//更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

//获取用户信息
export const reqUser = () => ajax('/user')

//获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type})