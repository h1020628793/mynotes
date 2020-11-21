import React,{Component} from './react'
import ReactDOM from './react-dom'

//函数组件

function App(props){
    return (
        <div>
            <p>111</p>
        </div>
    )
}

//类组件
/*
class App extends Component{
    render(){
        return (
            <div>
                <p>111</p>
            </div>
        )
    }
}
*/
ReactDOM.render(<App title="app" />,document.getElementById('root'))

