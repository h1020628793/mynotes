import * as types  from './actionTypes'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"
import { message } from 'antd'

import { saveUsername} from 'util'

import api from  'api'

const getRequestStart = ()=>({
    type: types.REQUEST_START
})

const getRequestEnd = () => ({
    type: types.REQUEST_END
})

const setCaptcha = (captcha)=>({
    type: types.SET_CAPTCHA,
    payload: captcha
})

export const getCaptchaAction = ()=>{
    /*
    return async function (dispatch) {
        const result = await axios({
            method: 'get',
            url: '/v1/users/captcha',
        })
        if (result.data.code == 0) {
            dispatch(setCaptcha(result.data.data))
        }
    }
    */
    return async function (dispatch) {
        const result = await api.getCaptcha()
        if (result.code == 0) {
            dispatch(setCaptcha(result.data))
        }
    }
}

export const getLoginAction = (values) => {
    return async function (dispatch) {
        dispatch(getRequestStart())
        /*
        const result = await axios({
            method: 'post',
            url: '/v1/users/login',
            data:{
                username: values.username, 
                password:values.password, 
                role:'admin', 
                captchaCode: values.captcha, 
                channel:'page'
            }
        })
        const data = result.data
        console.log(data);
        */
        const data = await api.login({
            username: values.username,
            password: values.password,
            role: 'admin',
            captchaCode: values.captcha,
            channel: 'page'
        })
        if(data.code == 1){
            message.error(data.message,1)
        }else{
            message.success('登录成功',1)
            //保存用户的登录状态
            saveUsername(data.data.username)
            //跳转到后台首页
        }
        dispatch(getRequestEnd())
    }
}