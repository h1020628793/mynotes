import React, { Component } from 'react'

import { Layout, Menu, Dropdown } from 'antd';
import {  DownOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

import { getUsername } from 'util'

import './index.less'

export default class CustomHeader extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => { console.log('logout...') }}><LogoutOutlined />退出</a>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="CustomHeader">
                <Header className="header">
                    <div className="logo">SortMall</div>
                    <div className="logout">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {getUsername()} <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </Header>
            </div>
        )
    }
}