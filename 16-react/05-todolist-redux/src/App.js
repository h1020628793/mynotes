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
 * 1. reducer必须要返回一个state的对象
 */
function reducer(state = defaultState, action) {

    let newState = JSON.parse(JSON.stringify(state))
    
    if (action.type == 'LOAD_DATA'){//初始化加载网络数据
        newState.list = action.payload
    }
    return newState
}

/**
 * 1. 给store指定reducer,今后store派发的action就会被转发到这个reducer里面
 * 2. 初始化store里面的state,会转发一个初始化的action(随机每次都会变化)到reducer,reducer会返回一个默认的state
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

        store.subscribe(() => {
            this.setState(store.getState())
        })

        this.handleChage = this.handleChage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChage(ev){
        this.setState({
            task:ev.target.value
        })
    }
    handleSubmit(){
        const list = [...this.state.list]
        list.push({
            id:Date.now(),
            task:this.state.task
        })
        this.setState({
            list,
            task:''
        })
    }
    handleDel(id){
        const list = this.state.list.filter(item=>id!=item.id)
        this.setState({
            list
        })
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