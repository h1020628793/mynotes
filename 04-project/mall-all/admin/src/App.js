import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import Login from 'pages/login'
import Home from 'pages/home'
import { getUsername } from './util'

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const ProtectRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => (getUsername() ? <Component /> : <Redirect to="/login" /> )}  />
        const LoginRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => (getUsername() ? <Redirect to="/" /> : <Component />)} />
        return (
            <Router>
            <div className="App">
                <Switch>
                    <ProtectRoute exact path="/" component={Home} />
                    <LoginRoute path="/login"  component={Login} />
                </Switch>
            </div>
            </Router>
        )
    }
}
export default App