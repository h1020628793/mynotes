import React, { Component } from 'react'
import UserInfo from './UserInfo.js'

class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <h1>Hello, world!</h1>
                    <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
            </div>
        )
    }

}
export default App