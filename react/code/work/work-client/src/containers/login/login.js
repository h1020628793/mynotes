/*
登录组件
*/

import React,{ Component } from 'react';
import { 
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Button 
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../redux/actions';

import Logo from '../../components/logo/logo';

class Login extends Component{
    state = {
        'username': '',
        'password': '',
    }
    login = () =>{
        this.props.login(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }
    
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    render(){
        const {msg,redirectTo} = this.props.user
        // 如果有值就需要重定向到指定的路由
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return(
            <div>
                <NavBar>招&nbsp;聘&nbsp;网&nbsp;站</NavBar>
                <Logo />
                <WingBlank size="sm">
                   <List>
                   {msg ? <div className='error-msg'>{msg}</div> : null}
                   <InputItem placeholder='请输入用户名'
                        onChange={value => {this.handleChange('username',value)}}>用户名:</InputItem>
                        <WhiteSpace /> 
                        <InputItem type='password' placeholder='请输入密码'
                        onChange={value => {this.handleChange('password',value)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;录</Button>
                        <WhiteSpace /> 
                        <Button onClick={this.toRegister}>还&nbsp;没&nbsp;有&nbsp;账&nbsp;户&nbsp;?</Button>
                        <WhiteSpace />
                   </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {login}
)(Login)