/*
大神信息完善的路由容器组件
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

class DashenInfo extends Component{
    
    state = {
        header:'',//头像名称
        post:'',//职位
        info:'',//个人或职位简介
    }
     // 更新header状态
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
        if(header) { // 说明信息已经完善
          const path = type==='dashen' ? '/dashen' : '/laoban'
          return <Redirect to={path}/>
        }
        return(
            <div>
            <NavBar>大神信息完善</NavBar>
            <HeaderSelecter setHeader={this.setHeader} />
            <InputItem placeholder='请输入求职岗位' onChange={value => {this.handleChange('post',value)}}>求职岗位:</InputItem>
            <TextareaItem placeholder='请输入个人介绍' onChange={value => {this.handleChange('info',value)}} title='个人介绍' rows={3}/>
            <Button type = 'primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
        </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
  )(DashenInfo)