import React, { Component } from 'react'
import { pathToRegexp } from 'path-to-regexp'

import { Consumer } from './context'
//一旦匹配到就停止
class Switch extends Component {
    render() {
        return <Consumer>
            {
                value => {
                    const children = this.props.children
                    const pathname = value.location.pathname
                    for(let i =0,len=children.length;i<len;i++){
                        const child = children[i]
                        const {path="",exact=false} = child.props
                        const paramNames = []
                        const reg = pathToRegexp(path, paramNames, { end: exact })
                        //生成匹配结果
                        const result = pathname.match(reg)
                        if (result){
                            return child
                        }
                    }
                    return null
                }
            }
        </Consumer>
    }
}

export default Switch