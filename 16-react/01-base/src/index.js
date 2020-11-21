import React, { Component} from 'react'
import ReactDOM from 'react-dom'
/*
const elem = (
    <div className="App">
        <ul className="list">
            <li className="item">item content</li>
        </ul>
    </div>
)
console.log(elem);
*/

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            scrore:100
        }
    }
    handleChange() {
        this.setState({
            num: this.state.num + 1
        })
        this.setState({
            scrore: this.state.scrore + 1
        })        
        console.log(this.state.num);
    }
    componentDidUpdate(state, props) {
        console.log('componentDidUpdate(state,props)', state, props);
    }    
    render() {
        return (
            <div className="App">
                <p>{this.state.num}---{this.state.scrore}</p>
                <button onClick={this.handleChange.bind(this)}>修改</button>
            </div>
        )
    }
}

//ReactDOM.render 根据虚拟DOM挂载DOM节点
ReactDOM.render(<App title="app" />, document.getElementById('root'))
