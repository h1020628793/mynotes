import React,{ Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
class Main extends Component{

    static propTypes = {
        searchName: PropTypes.string.isRequired
    }
    state={
        initView: true,
        loading: false,
        users: null,
        errorMsg: null
    }

    //当组件接受到新的属性时候回调
    //调用之后表示下一步要发送请求了(axios)
    componentWillReceiveProps(newProps){
        const {searchName} = newProps
        //更新(请求中)状态
        this.setState({
            initView: false,
            loading: true
        })
        //发送ajax请求
        const url = `https://api.github.com/search/users?q=${searchName}`
        axios.get(url)
            .then(response => {
                const result = response.data
                console.log(result);
                const users = result.items.map(item => {
                    return {name: item.login, url: item.html_url, avatarUrl: item.avatar_url}
                })
                //成功
                this.setState({loading: false ,users})
            })
            .catch(error => {
                // 失败
                this.setState({loading: false, errorMsg: error.message})
            })

    }

    render(){
        const {initView, loading, users, errorMsg } = this.state
        const {searchName} = this.props
        //进行判断
        if(initView){
        return <h2>请输入关键字进行搜索</h2>
        } else if(loading){
            return <h2>正在请求中</h2>
        } else if(errorMsg){
            return <h2>请求出错</h2>
        } else{
            return(
                <div className="row">
                    {
                        users.map((user, index) => (
                        <div className="card" key={index}>
                            <a href={user.url} target="_blank">
                                <img src={user.avatarUrl} style={{width: 100}}/>
                            </a>
                            <p className="card-text">{user.name}</p>
                        </div>
                        ))
                    }  
                </div>
            )
        }
    }
}
export default Main