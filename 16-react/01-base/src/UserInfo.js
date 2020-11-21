import React, { Component } from 'react'

class UserInfo extends Component {
    constructor(props) {
        console.log('UserInfo Component constructor(props):', props);
        super(props)
        this.state = {
            score: 0
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('UserInfo Component getDerivedStateFromProps(nextProps, prevState):', nextProps, prevState)
        //返回一个对象来更新state,如果返回null则不更新任何内容

        return null

        //return { score:10, major: 'Art' }
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('UserInfo Component shouldComponentUpdate(nextProps, nextState):', nextProps, nextState);
        //模拟一个条件:成绩如果是40就不更新
        if (nextState.score == 40) {
            return false
        } else {
            return true
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('UserInfo Component getSnapshotBeforeUpdate(prevProps, prevState):', prevProps, prevState);
        return {
            snapshot: 'this is snapshot data before update'
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('UserInfo Component componentDidUpdate(prevProps, prevState, snapshot):', prevProps, prevState, snapshot);
    }     
    componentDidMount() {
        console.log('UserInfo Component componentDidMount()')
    }
    componentWillUnmount(){
        console.log('UserInfo Component componentWillUnmount()')
    }
    render() {
        console.log('UserInfo Component render()')
        console.log('UserInfo Component new state=', this.state)

        const { name, age, city } = this.props
        return (
            <div className="UserInfo">
                <h1>用户信息</h1>
                <p>用名:{name}</p>
                <p>年龄:{age}</p>
                <p>城市:{city}</p>
                <p>成绩:{this.state.score}</p>
                <p><button onClick={() => { this.setState({ score: this.state.score + 10 }) }}>更改组件state</button></p> 
            </div>
        )
    }
}
export default UserInfo