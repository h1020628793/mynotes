/*
主界面组件
*/

import React,{ Component } from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; //可以操作前端cookie的对象 set()/get()/remove()
import {NavBar} from 'antd-mobile';

import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import Personal from '../personal/personal';
import Message from '../message/message';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer'
import {getRedirectTo} from '../../utils';
import {getUser} from '../../redux/actions';

class Main extends Component{
    //加static是给组件类添加属性
     // 给组件对象添加属性(不加Static)
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
    
    componentDidMount(){
    // 登陆过（代表cookie中有userid），但还没有登录(redux管理的user中没有_id)，之后才发送请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            //发送异步请求来获取user
            // console.log('发送ajax请求');
            this.props.getUser()
        }
    }
    render(){
        // //检查用户是否登录，如果没有，自动重定向到登录界面
        // const {user} = this.props
        // if(!user._id){
        //     return <Redirect to='/login/' />
        // }

        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login' />
        }
        //如果有，读取redux中的user状态
        const {user} = this.props
        //如果redux中有user状态，但是user中没有id,返回一个Null
        if(!user._id){
            return null
        }else {
            //如果redux中有user状态，但是user中有id,显示对应的界面
            //如果请求根路径， 根据user的type和header来计算出一个重path定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if(path==='/'){ //根路径
                //得到一个重定向的路由路径
                path = getRedirectTo(user.type, user.header)
                return <Redirect to= {path}/>
            }
        }
        const {navList} = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有
        if(currentNav) {
            // 决定哪个路由需要隐藏
            if(user.type==='laoban') {
            // 隐藏数组的第2个
            navList[1].hide = true
            } else {
            // 隐藏数组的第1个
            navList[0].hide = true
            }
        }
        return (
            <div>
              {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
              <Switch>
                {
                  navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                }
                <Route path='/laobaninfo' component={LaobanInfo}/>
                <Route path='/dasheninfo' component={DashenInfo}/>
                <Route component={NotFound}/>
              </Switch>
              {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
          )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

/*
1.实现自动登录：

    1):在componentDidMount()中
    登陆过（代表cookie中有userid），但还没有登录(redux管理的user中没有_id)，之后才发送请求获取对应的user
2.render()  中 
    2):如果cookie中没有userid,自动重定向登录界面
    3):判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
    4):如果有，说明当前已经登陆，显示对应的界面
    5)如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向到
*/