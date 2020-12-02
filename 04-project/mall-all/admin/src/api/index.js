import axios from 'axios'
import {SERVER,VERSION,API_CONFIG} from './config'

import { goLogin,removeUsername} from 'util'

/**
 * 目标 根据配置文件生成一个对象,这个对象的每一个属性是一个方法名,属性的值是一个api的调用方法
 * @param {object} apiConfig 
 */
const getApiObj = (apiConfig)=>{
    const apiObj = {}
    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
            const method = apiConfig[key][1] || 'get'
            //发送请求
            return request(url,method,data)
        }
    }
    return apiObj
}

const request=(url,method,data)=>{
    return new Promise((resolve,rejcect)=>{
        const options = {
            method:method,
            url:url,
            data:data
        }
        axios(options)
        .then(result=>{
            const data = result.data
            if(data.code == 10){
                //没有权限
                removeUsername()
                goLogin()
                rejcect('没有权限')
            }else{
                resolve(data)
            }
        })
        .catch(e=>{
            rejcect(e)
        })
    })
}


export default getApiObj(API_CONFIG)



