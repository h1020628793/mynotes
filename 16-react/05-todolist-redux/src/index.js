import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import { Provider } from 'react-redux'

import store from './store'
/**
 * 1. 在Provider 组件中指定 store
 * 2. 用Provider 组件包裹应用的顶层组件,这样整个应用的所有组件都可以使用store
 */
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'))
