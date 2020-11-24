import React from 'react'
import { Row, Col, Input, Button, List } from 'antd'
import './index.css'
//UI组件
const AppUI = (props)=>{
    const {task,list,handleChage,handleDel,handleSubmit} = props
    return(
        <div className="App">
            <Row>
                <Col span={18}><Input onChange={handleChage} value={task} /></Col>
                <Col span={6}><Button type="primary" onClick={handleSubmit}>提交</Button></Col>
            </Row>
            <List
                style={{ marginTop: '30px' }}
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item onClick={()=>{handleDel(item.id)}}>
                        {item.task}
                    </List.Item>
                )}
            />
        </div>        
    )
}

export default AppUI