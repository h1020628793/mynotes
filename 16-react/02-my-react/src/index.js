import React, { Component} from './react'
import ReactDOM from './react-dom'

//类组件
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            score: 100
        }
    }
    handleChange() {
        this.setState({
            num: this.state.num + 1
        })
        this.setState({
            score: this.state.score + 1
        })
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    render() {
        return (
            <div className="App">
                <p>num:{this.state.num}score{this.state.score}</p>
                <button onClick={this.handleChange.bind(this)}>修改</button>
            </div>
        )
    }
}
//ReactDOM.render 根据虚拟DOM挂载DOM节点
ReactDOM.render(<App title="App" />, document.getElementById('root'))

