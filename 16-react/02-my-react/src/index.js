import React,{Component} from './react'
import ReactDOM from './react-dom'

// babel的作用: 首先把相关的代码转换->调用React.createElement()方法,调用的时候会把转换后的结果以参数的新式传递给该方法
// React.createElement方法来自于React框架,作用就是返回对应的虚拟DOM

/*
const elem = (
    <div className='box'>
        <p>111</p>
    </div>
)
*/
//函数组件
/*
function App(props){
    return (
        <div className="App">
            <p>111</p>
        </div>
    )
}
*/
//类组件

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            scrore: 100
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

