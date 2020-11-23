import React, { Component } from 'react'

class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { task, handleDel} = this.props
        return(
            <li className="item" onClick={handleDel}>{task}</li>
        )
    }
}

export default Item