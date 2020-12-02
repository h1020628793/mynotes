import React,{Component} from 'react'
import { Layout, Breadcrumb, Card, Row, Col } from 'antd';

const { Content } = Layout;

import CustomLayout from 'components/custom-layout'

class Home extends Component{
    render(){
        return(
        <div className="Home">
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Row>
                        <Col span={8}>
                            <Card title="用户数" bordered={false} style={{ width: 300 }}>
                                <p>100</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="商品数" bordered={false} style={{ width: 300 }}>
                                <p>101</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="订单数" bordered={false} style={{ width: 300 }}>
                                <p>102</p>
                            </Card>
                        </Col>                                                                    
                    </Row>
                </Content>
            </CustomLayout>
        </div>
        )
    }
}

export default Home