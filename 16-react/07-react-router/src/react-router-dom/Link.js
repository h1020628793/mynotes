import React, { Component } from 'react'

import { Consumer } from './context'

class Link extends Component {
    render() {
        return <Consumer>
            {
                value => {
                    return <a href="javascript:;" onClick={() => { value.history.push(this.props.to) }}>{this.props.children }</a>
                }
            }
        </Consumer>
    }
}

export default Link