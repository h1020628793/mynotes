import * as types  from './actionTypes'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"

export const getLoginAction = (values) => {
    return async function (dispatch) {
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
        console.log(result)
    }
}