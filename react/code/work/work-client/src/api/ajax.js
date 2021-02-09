/*
能发送ajax请求的函数模块
函数的返回值是promise对象

注册/登录前台处理步骤
1.ajax
2.redux
3.component
*/
import axios from 'axios';
const baseUrl = ''
// const baseUrl = 'http://localhost:4000'
export default function ajax(url, data = {}, type = 'GET') {
    url = baseUrl + url
    if(type === 'GET'){ //发送get请求
        //拼接请求参数
        //data:{username: tom, password:123}
        //paramStr: username=tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr){
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        // 使用axios发送get请求
        return axios.get(url + '?' + paramStr)
    } else {
        // 使用axios发送post请求
        return axios.post(url, data)
    }
}