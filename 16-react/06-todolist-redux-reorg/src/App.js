import React, { Component } from 'react'

import './index.css'

import TodoList from './pages/todolist'
import Nav from './pages/nav'

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="App">
                <Nav />
                <TodoList />
            </div>
        )
    }

}
export default App