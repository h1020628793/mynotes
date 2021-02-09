/*
消息的主界面容器组件
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

class Message extends Component{
    render(){
        return(
            <div>hello</div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Message)