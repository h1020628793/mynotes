import React, { Component } from 'react'

// import { HashRouter as Router,Route} from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink, useParams } from 'react-router-dom'

import './index.css'

class Home extends Component {
    render() {
        return (
            <div className="Home">
                Home page
                {this.props.children}
            </div>
        )
    }
}
class About extends Component {
    render() {
        return (
            <div className="About">
                About page
            </div>
        )
    }
}
function User(props) {
    const { id } = useParams()
    return (
        <div className="User">
            User page,user id by props.match:  {props.match.params.id},
            user id by useParams(): {id}
        </div>
    )
}
/*
class User extends Component {
    render() {
        console.log(useParams());
        return (
            <div className="User">
                User page,user id is {this.props.match.params.id}
            </div>
        )
    }
}
*/
class Admin extends Component {
    render() {
        return (
            <div className="Admin">
                <ul>
                    <li><NavLink activeClassName="selected" exact to="/admin/profile">管理员配置</NavLink></li>
                    <li><NavLink activeClassName="selected" exact to="/admin/123">管理员中心</NavLink></li>
                </ul>
                <Switch>
                    <Route exact path="/admin" render={() => (<h1>admin home page</h1>)} />
                    <Route path="/admin/profile" render={() => (<h1>admin profile page</h1>)} />
                    <Route path="/admin/:id" render={(props) => (<h1>admin id is{props.match.params.id}</h1>)} />
                </Switch>
            </div>
        )
    }
}
class UserProfile extends Component {
    render() {
        return (
            <div className="UserProfile">
                User profile page
            </div>
        )
    }
}
class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                NotFound
            </div>
        )
    }
}
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true
        }
    }
    render() {
        const ProtectRoute = ({ component: Component, ...rest }) =>
            <Route
                {...rest}
                render={() => (this.state.isLogin ? <Component /> : <h2>请用管理员账号登录</h2>)}
            />
        return (
            <div className="App">
                <Router>
                    <ul>
                        <li><NavLink activeClassName="selected" to="/home">首页</NavLink></li>
                        <li><NavLink activeClassName="selected" to="/about">关于</NavLink></li>
                        <li><NavLink activeClassName="selected" exact to="/user/profile">用户配置</NavLink></li>
                        <li><NavLink activeClassName="selected" exact to="/user/123">用户中心</NavLink></li>
                        <li><NavLink activeClassName="selected" to="/admin">管理中心</NavLink></li>
                    </ul>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/home" render={() => <Home><p>this is child of home component</p></Home>} />
                        <Route path="/about" component={About} />
                        <Route path="/user/profile" component={UserProfile} />
                        <Route path="/user/:id" render={(props) => (<div>User page,user id is {props.match.params.id}</div>)} />

                        <ProtectRoute path="/admin" component={Admin} />

                        <Route path="/notfound" component={NotFound} />
                        <Redirect to="/notfound" />

                    </Switch>
                </Router>
            </div>
        )
    }
}
export default App