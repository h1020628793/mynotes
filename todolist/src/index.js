{/*
1.写入口函数，引入组件Component、ReactDOM、和根文件App.js文件
2.获取index.html中的根节点
*/}

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(<App />,document.getElementById('root'))