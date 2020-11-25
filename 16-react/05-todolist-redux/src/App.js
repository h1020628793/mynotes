import React, { Component } from 'react'

import { connect } from 'react-redux'

import AppUI from './AppUI'

import { getLoadDataAction, getChangeItemAction, getAddItemAction, getDelItemAction } from './store/actionCreator'

//容器组件
class App extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.handleLoadData()
    }
    render() {
        const { task, list, handleChange, handleDel, handleSubmit} = this.props
        return <AppUI 
                    task={task}
                    list={list}
                    handleChange={handleChange}
                    handleDel={handleDel}
                    handleSubmit={handleSubmit}
                />
    }

}
/**
 * 映射属性函数
 * 1. 该函数作为connect方法的第一个参数
 * 2. 该函数的第一个参数是store中的新的state
 * 3. 该函数返回一个对象,这个对象的属性会被映射到组件的props上面
 * 4. 该函数会在connect方法调用时被执行一次进行初始化,然后当state发送变化时会被自动执行
 */
/*
const mapStateToProps = (state)=>{
    console.log(state)
    return {
        task:state.task,
        list:state.list
    }
}
*/
//该方法和上面的方法等价
const mapStateToProps = (state) => ({
    task: state.task,
    list: state.list
})
/**
 * 映射方法函数
 * 1. 该函数作为connect方法的第二个参数
 * 2. 该函数的第一个参数是store的dispatch方法
 * 3. 该函数返回一个对象,这个对象的属性(方法)会被映射到组件的props上面
 */
const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        dispatch(getChangeItemAction(ev.target.value))
    },
    handleSubmit:()=>{
        dispatch(getAddItemAction(Date.now()))
    },
    handleDel:(id)=>{
        dispatch(getDelItemAction(id))
    },
    handleLoadData:()=>{
        dispatch(getLoadDataAction())
    }
})
/**
 * connect方法:
 * 1. connect方法的作用是让组件和store建立连接
 * 2. connect方法返回一个方法,返回的方法接收一个组件,这个返回的方法的执行结果时一个和store建立了连接的组件
 * 3. connect方法的第一个参数是映射属性函数
 * 4. connect方法的第二个参数是映射方法函数
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)