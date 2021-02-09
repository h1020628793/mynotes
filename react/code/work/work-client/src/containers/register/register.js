/*
注册组件
*/

import React,{ Component } from 'react';
import { 
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Radio,
    Button 
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {register} from '../../redux/actions';
import Logo from '../../components/logo/logo';

const ListItem = List.Item
class Register extends Component{
    state = {
        'username': '',
        'password': '',
        'password2': '',
        'type': ''
    }
    //点击注册调用
    register = () => {
        // console.log(this.state);
        this.props.register(this.state)
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }
    //处理输入数据的改变，更新对应的状态
    //name是要更变的属性的属性名
    handleChange = (name, value) => {
        
    //更新name的属性值，用[name]这个语法可以把字符串name变为变量name，属性名默认为字符串
        this.setState({
            [name]: value //属性名不是name，而是name变量的值
        })
    }

    render(){
        const {type} = this.state
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
                        <InputItem type='password' placeholder='请输入密码'
                        onChange={value => {this.handleChange('password',value)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <InputItem type='password' placeholder='请再次输入密码'
                        onChange={value => {this.handleChange('password2',value)}}>确认密码:</InputItem>
                        {/* ListItem可以让标签在同一行 */}
                        <ListItem>
                            <span>用户类型:</span>&nbsp;&nbsp;
                            <Radio checked={type === 'dashen'} onChange={() => {this.handleChange('type', 'dashen')}}>大神</Radio>&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={() => {this.handleChange('type', 'laoban')}}>老板</Radio>
                        </ListItem>
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;册</Button><WhiteSpace />
                        <Button onClick={this.toLogin}>已&nbsp;有&nbsp;账&nbsp;户</Button><WhiteSpace />
                   </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)