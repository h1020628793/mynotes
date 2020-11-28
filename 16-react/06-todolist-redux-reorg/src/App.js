import React, { Component } from 'react'

import './index.css'

import TodoList from './pages/todolist'
import Head from './pages/head'

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="App">
                <Head />
                <TodoList />
            </div>
        )
    }

}
export default App