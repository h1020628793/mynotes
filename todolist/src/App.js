{/*
1.首先引入react框架，和Component组件、和css文件
2.定义App组件(注意：定义组件必须要继承组件Component)
3.写constructor构造函数并且传入参数props,之后必须写super(props)
4.在this.state上写需要渲染到页面的list数组
5.创建一个items变量，并且使用map方法遍历this.state.list数组，任务列表用{item.task}代替
6.之后添加onChange事件,并且添加handleChange处理方法(一定要bind)
7.处理handleChange方法：（1）首先此时输入框中的值value=this.state.task
                        (2)利用this.setState方法重新设置state属性
                        （3）重构之后此时的task变为ev.target.value
8.在提交按钮上添加onClick方法和handleSubmit方法,一定要bind
9.提交的时候：（1）首先要拿到List数组[...this.state.list],并且重新赋值给list
            (2)在push到list中,此时的task为this.state.task
            (3)之后才可以重新设置state的属性，注意提交之后把输入框的值清空
10在items上添加onClick事件和handleDel方法,可以利用箭头函数来添加()=>{this.handleDel(item.id)}
由于删除的时候要先拿到所需要删除的item的ID，因此此时可以传item.id给handleDel
11.改变handleDel的this
12.处理handleDel方法时候，传入id
13.重新给list赋值,利用filter方法可以过滤除了id的其它参数(this.state.list.filter(item => id!=item.id))
14.重新给state中的list赋删除过后的List
*/}

import React, { Component } from 'react'
import axios from 'axios'
// import regeneratorRuntime from 'regeneratorRuntime'
import './index.css'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:[],
            task:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDel = this.handleDel.bind(this)
    }
    handleChange(ev){
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
            list:list,
            task:''
        })
    }
    handleDel(id){
       const list = this.state.list.filter(item => id!=item.id)
       this.setState({
           list:list
       })
        
    }
    // async componentDidMount()
    componentDidMount(){
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
           this.setState({
               list:result.data
           })
        })
        // const result = await axios.get('http://127.0.0.1:3000')
        // this.setState({
        //     list:result.data
        // })
    }
    render(){
    const items = this.state.list.map(item=><li key={item.id} className='item' onClick={()=>{this.handleDel(item.id)}}>{item.task}</li>)
        return(
            <div className='App'>
              <div className='head'>
                  <input value={this.state.task} onChange={this.handleChange} />
                  <button onClick = {this.handleSubmit}>提交</button>
              </div>
              <ul className='list'>
                {items}
              </ul>
            </div>
        )
    }
}
export default App