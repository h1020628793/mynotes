/*
选择头像用户的UI组件
*/

import React,{Component} from 'react'
import { List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types'


export default class HeaderSelecter extends Component{
    
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon:null  //图片对象，默认没有值
    }
    constructor(props){
        super(props)
        //准备需要显示的图片数据
        this.headerList = []
        for(let i = 0; i < 20; i++){
            this.headerList.push({
                text: '头像' +(i+1),
                icon: require(`../../assets/images/头像${i+1}.png`)//不能使用import
            })
        }
    }
    //handleClick接收一个el参数,el是你点击的数组中的某一个元素,这个元素是一个对象，其中包含了text和icon
    handleClick = ({text,icon}) => {
        //更新当前组件的状态
        this.setState({icon})
        //调用函数更新父组件状态
        this.props.setHeader(text)
    }

    render(){
        //头部界面
        const {icon} = this.state
        //选用头像,当点击一次头像时候，需要重新设置一下icon的状态，并且还要调用一次setHeader()方法
        const listHeader = !icon ? '请选择头像' : <div>已选择头像:<img src={icon} /></div>
        return(
            <List renderHeader={() => listHeader}>
               <Grid data={this.headerList} 
                     columnNum={5}
                     onClick={this.handleClick} />
            </List>
        )
    }
}

