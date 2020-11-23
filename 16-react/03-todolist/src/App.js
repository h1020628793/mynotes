import React, { Component } from 'react'
import axios from 'axios'
import regeneratorRuntime from './regeneratorRuntime'

import './index.css'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            list:[],
            task:''
        }
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
        const result = await axios.get('http://127.0.0.1:3000')
        this.setState({
            list: result.data
        })
    }
    render() {
        const items = this.state.list.map(item => <li key={item.id} className="item" onClick={this.handleDel.bind(this,item.id)}>{item.task}</li>)
        return (
            <div className="App">
                <div className="head">
                    <input value={this.state.task} onChange={this.handleChage} />
                    <button onClick={this.handleSubmit}>提交</button>
                </div>
                <ul className="list">
                    {items}
                </ul>
            </div>
        )
    }

}
export default App