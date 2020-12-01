import * as types  from './actionTypes'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"
import { message } from 'antd'

import { saveUsername} from '../../../util'

const getRequestStart = ()=>({
    type: types.REQUEST_START
})

const getRequestEnd = () => ({
    type: types.REQUEST_END
})

export const getLoginAction = (values) => {
    return async function (dispatch) {
        dispatch(getRequestStart())
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