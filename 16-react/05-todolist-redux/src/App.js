import React, { Component } from 'react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"
import { Row, Col, Input, Button, List } from 'antd'
//import 'antd/dist/antd.css';//引入所有的css
import './index.css'

import store from './store'

import { getLoadDataAction, getChangeItemAction, getAddItemAction, getDelItemAction } from './store/actionCreator'

class App extends Component {
    constructor(props){
        super(props)

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
        store.dispatch(getChangeItemAction(ev.target.value))
    }
    handleSubmit(){
        store.dispatch(getAddItemAction(Date.now()))
    }
    handleDel(id){
        store.dispatch(getDelItemAction(id))
    }
    async componentDidMount(){
        const result = await axios.get('http://127.0.0.1:3000')
        store.dispatch(getLoadDataAction(result.data))
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