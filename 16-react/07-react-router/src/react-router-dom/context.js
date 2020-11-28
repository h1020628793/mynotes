import React from 'react'

const Context = React.createContext()

const { Provider, Consumer } = Context

export {
    Provider,//提供数据的组件
    Consumer//消费数据的组件
}