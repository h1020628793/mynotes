import React, { Component } from 'react'

import AppUI from './AppUI'

import store from './store'
import { getLoadDataAction, getChangeItemAction, getAddItemAction, getDelItemAction } from './store/actionCreator'

//容器组件
class App extends Component {
    constructor(props){
        super(props)
        //使用Redux后初始化数据来自于store
        this.state = store.getState()
        //监听state的变化,store里面的state一旦有变化,就会执行subscribe里面指定的函数
        store.subscribe(() => {
            this.setState(store.getState())
        })

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDel = this.handleDel.bind(this)
    }
    handleChange(ev){
        store.dispatch(getChangeItemAction(ev.target.value))
    }
    handleSubmit(){
        store.dispatch(getAddItemAction(Date.now()))
    }
    handleDel(id){
        store.dispatch(getDelItemAction(id))
    }
    componentDidMount(){
        //getLoadDataAction()返回一个异步请求处理的函数
        store.dispatch(getLoadDataAction())
    }
    render() {
        return <AppUI 
                    task={this.state.task}
                    list={this.state.list}
                    handleChange={this.handleChange}
                    handleDel={this.handleDel}
                    handleSubmit={this.handleSubmit}
                />
    }

}
export default App