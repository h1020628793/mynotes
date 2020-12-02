import React, { Component } from 'react'

import { Layout} from 'antd';

import CustomHeader from 'components/custom-header'
import CustomSider from 'components/custom-sider'

import './index.less'

export default class CustomLayout extends Component {
    render() {
        return (
            <div className="CustomLayout">
                <Layout>
                    <CustomHeader />
                    <Layout>
                        <CustomSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                          {this.props.children}
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}