import React, { Component } from 'react'

import { Provider } from './context'

let pushState = window.history.pushState

window.history.pushState = (state,title,url)=>{
    pushState.call(window.history, state, title, url)
    //调用一个模拟的事件
    window.onstatechange && window.onstatechange()
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
        //模拟监听
        window.onstatechange = () => {
            this.setState({
                location: {
                    pathname: window.location.pathname
                }
            })
        }
    }
    render() {
        const value = {
            location: this.state.location,
            history: {
                push(to) {
                    window.history.pushState(null,'',to)
                }
            }
        }
        return (<Provider value={value}>{this.props.children}</Provider>)
    }

}

export default BrowserRouter