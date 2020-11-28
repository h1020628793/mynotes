import React, { Component } from 'react'

import { Consumer } from './context'

class Redirect extends Component {
    render() {
        return <Consumer>
            {
                value => {
                    value.history.push(this.props.to)
                    return null
                }
            }
        </Consumer>
    }
}

export default Redirect