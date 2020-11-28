import React, { Component } from 'react'
import { pathToRegexp } from 'path-to-regexp'

import { Consumer } from './context'
/**
 * Route组件的核心功能:
 * 1. 路由的匹配(注意exact属性的处理),根据匹配结果返回对应的组件
 * 2. 获取路由当中的参数
 */
class Route extends Component{
    render(){
        return <Consumer>
            {
                //定义一个函数组件来消费Provider提供的数据
                value => {
                    //this.props是Route组件上添加的属性
                    const { path, component: Component, exact=false} = this.props
                    //pathname是从Router组件传递过来的
                    const pathname = value.location.pathname
                    //根据Route组件上的path生成正则
                    const paramNames = []
                    //end是ture表示在正则结尾添加$,是false就不添加
                    const reg = pathToRegexp(path, paramNames, { end: exact})
                    //生成匹配结果
                    const result = pathname.match(reg)
                    if (result){
                        //处理参数
                        const names = paramNames.map(item=>item.name)
                        const [url,...values] = result
                        const params = {}
                        names.forEach((name,index)=>{
                            params[name] = values[index]
                        })
                        const props = {
                            location: value.location,
                            history:value.history,
                            match:{
                                params,
                                path,
                                url,
                                isExact:exact
                            }
                        }
                        return <Component {...props} />
                    }
                    return null
                }
            }
        </Consumer>
    }
}

export default Route