import React, { Component } from 'react'

//import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

//import { HashRouter as Router, Route, Switch, Redirect, Link} from './react-router-dom'
import { HashRouter as Router, Route, Link, Switch, Redirect } from './react-router-dom'
class Home extends Component{
    render(){
        // console.log(this.props);
        return (
            <div className="Home">
                Home page
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
class User extends Component{
    render() {
        console.log(this.props);
        return (
            <div className="UserProfile">
                User  page {this.props.match.params.id}
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
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <Link to="/home">首页</Link>
                    <Link to="/about">关于</Link>
                    <Link to="/user/profile">用户配置</Link>
                    <Link to="/user/123">用户中心</Link>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/user/profile" component={UserProfile} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/notfound" component={NotFound} />
                        <Redirect to="/notfound" />
                    </Switch>    
                </Router>
            </div>
        )
    }
}
export default App