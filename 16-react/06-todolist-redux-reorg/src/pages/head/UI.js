import React from 'react'
//UI组件
const UI = (props) => {
    const { name } = props
    return (
        <div>
          <h1> {name}</h1>
        </div>
    )
}
export default UI