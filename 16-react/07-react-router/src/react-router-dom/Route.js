import React, { Component } from 'react'

import { Consumer } from './context'

class Route extends Component{
    render(){
        return <Consumer>
            {
                //定义一个函数组件来消费Provider提供的数据
                value => {
                    console.log('1::',value);
                    console.log(this.props)
                    return null
                }
            }
        </Consumer>
    }
}

export default Route