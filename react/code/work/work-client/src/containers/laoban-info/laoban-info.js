/*
老板信息完善的路由容器组件
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import { 
    NavBar, 
    InputItem,
    TextareaItem,
    Button 
} from 'antd-mobile';

import HeaderSelecter from '../../components/header-selecter/header-selecter';
import {updateUser} from '../../redux/actions';

class LaobanInfo extends Component{

    state = {
        header:'',//头像名称
        post:'',//职位
        info:'',//个人或职位简介
        company:'',//公司名称
        salary:'' //工资
    }
    setHeader = (header) => {
        this.setState({header})
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    save = () => {
        this.props.updateUser(this.state)
    }
    render(){
        //如果信息已经完善，自动重定向到对应的主界面去 
        const {header, type} = this.props.user
        if(header){ //说明信息已经完善，没有必要渲染信息完善这个页面
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path} />
        }
        return(
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelecter setHeader={this.setHeader} />
                <InputItem placeholder='请输入招聘职位' onChange={value => {this.handleChange('post',value)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={value => {this.handleChange('company',value)}}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={value => {this.handleChange('salary',value)}}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:"
                      placeholder='请输入个人介绍'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
                <Button type = 'primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaobanInfo)