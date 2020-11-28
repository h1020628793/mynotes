import React, { Component } from 'react'
import { connect } from 'react-redux'
import UI from './UI'
//容器组件
class Nav extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { name } = this.props
        return <UI name={name} />
    }
}
const mapStateToProps = (state) => ({name: state.get('head').get('name')})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Nav)