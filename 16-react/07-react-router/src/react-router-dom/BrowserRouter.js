import React, { Component } from 'react'

import { Provider } from './context'

//保存原有的pushState方法
let pushState = window.history.pushState

//从新定义一个pushState方法
window.history.pushState = (state,title,url)=>{
    //调用原有的pushState方法
    pushState.call(window.history, state, title, url)
    //调用一个模拟的事件
    window.onpushstate && window.onpushstate()
}


class BrowserRouter extends Component {
    constructor(props) {
        super(props)
        //初始化数据
        this.state = {
            location: {
                pathname: window.location.pathname
            }
        }
    }
    componentDidMount() {
        //模拟事件监听:其实就是定义了一个方法,该方法会在pushState方法中调用
        window.onpushstate = () => {
            this.setState({
                location: {
                    pathname: window.location.pathname
                }
            })
        }
    }
    render() {
        //定义所有子组件需要使用的数据
        const value = {
            location: this.state.location,
            history: {
                //改变路由的方法
                push(to) {
                    window.history.pushState(null,'',to)
                }
            }
        }
        return (<Provider value={value}>{this.props.children}</Provider>)
    }

}

export default BrowserRouter