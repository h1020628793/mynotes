import React, { Component } from 'react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"
import { Row, Col, Input, Button, List } from 'antd'
//import 'antd/dist/antd.css';//引入所有的css
import './index.css'


import { createStore } from 'redux'

//定义一个初始化的state
const defaultState = { list: [], task: '' }

/**
 * 1. reducer是一个纯函数(固定的输入必须是一个固定的输出),保证有固定输出的方法是不要在函数中使用Date.now或者Math.random这些方法生成数据
 * 2. reducer主要是根据上一次的state和最新的action用来处数据
 * 3. reducer必须要返回一个新的state的对象,因为state应该有store来统一管理
 * 4. store根据返回的新的state来更新store里面的state,组件使用getState方法来获取store里面的state
 * 5. action是一个对象,存储了操作类型和必要的参数,必须保证action的类型是唯一的
 */
function reducer(state = defaultState, action) {    
    //复制一个新的state
    let newState = JSON.parse(JSON.stringify(state))
    
    if (action.type == 'LOAD_DATA'){//初始化加载网络数据
        newState.list = action.payload
    }
    if (action.type == 'CHANGE_ITEM') {//修改input框的数据
        newState.task = action.payload
    }
    if (action.type == 'ADD_ITEM') {//添加项目
        const item = {
            id:action.payload,
            task:newState.task
        }
        newState.task = ''
        newState.list.push(item)
    } 
    if(action.type == 'DEL_ITEM'){
        const list = newState.list.filter(item => action.payload != item.id)
        newState.list = list
    }
    //返回一个新的state 
    return newState
}

/**
 * createStore的主要作用:
 * 1. 给store指定reducer,今后派发的action就会被转发到这个reducer里面
 * 2. 初始化store里面的state,会派发一个初始化的action(随机每次都会变化)到reducer,reducer会返回一个默认的初始化state
 */
let store = createStore(reducer)

class App extends Component {
    constructor(props){
        super(props)
        /*
        this.state = {
            list:[],
            task:''
        }
        */

        //使用Redux后初始化数据来自于store
        this.state = store.getState()
       
        //监听state的变化,store里面的state一旦有变化,就会执行subscribe里面指定的函数
        store.subscribe(() => {
            this.setState(store.getState())
        })

        this.handleChage = this.handleChage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChage(ev){
        /*
        this.setState({
            task:ev.target.value
        })
        */
        store.dispatch({ type: 'CHANGE_ITEM', payload: ev.target.value })
    }
    handleSubmit(){
        /*
        const list = [...this.state.list]
        list.push({
            id:Date.now(),
            task:this.state.task
        })
        this.setState({
            list,
            task:''
        })
        */
        store.dispatch({ type: 'ADD_ITEM',payload:Date.now()})
    }
    handleDel(id){
        /*
        const list = this.state.list.filter(item=>id!=item.id)
        this.setState({
            list
        })
        */
        store.dispatch({ type: 'DEL_ITEM', payload: id })
    }
    async componentDidMount(){
        /*
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
            this.setState({
                list:result.data
            })
        })
        */
        /*
        const result = await axios.get('http://127.0.0.1:3000')
        this.setState({
            list: result.data
        })
        */
        const result = await axios.get('http://127.0.0.1:3000')
        store.dispatch({ type: 'LOAD_DATA', payload: result.data})
    }
    render() {
        return (
            <div className="App">
                <Row>
                    <Col span={18}><Input onChange={this.handleChage} value={this.state.task} /></Col>
                    <Col span={6}><Button type="primary" onClick={this.handleSubmit}>提交</Button></Col>
                </Row>
                <List 
                    style={{marginTop:'30px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item onClick={this.handleDel.bind(this, item.id)}>
                           {item.task}
                        </List.Item>
                    )}
                />
            </div>
        )
    }

}
export default App