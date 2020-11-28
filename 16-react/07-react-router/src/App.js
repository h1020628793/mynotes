import React, { Component } from 'react'

//import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

//import { HashRouter as Router, Route, Switch, Redirect, Link} from './react-router-dom'
import { HashRouter as Router, Route } from './react-router-dom'
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
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/user/:id/:name" component={User} />
                </Router>
            </div>
        )
    }
}
export default App