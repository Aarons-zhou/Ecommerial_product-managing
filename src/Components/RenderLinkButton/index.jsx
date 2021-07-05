import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

export default class LinkButton extends Component {
    static propTypes = {
        children: PropTypes.string.isRequired
    }

    render() {
        return (
            <button className='link-button' {...this.props}></button>
        )
    }
}
