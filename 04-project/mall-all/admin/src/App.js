import React, { Component } from 'react'

import Login from '../src/pages/login'

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="App">
                <Login />
            </div>
        )
    }
}
export default App