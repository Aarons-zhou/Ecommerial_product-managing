import React, { Component } from 'react'
import logo from '../../Images/logo.png'
import './index.less'

export default class Loading extends Component {
    render() {
        return (
            <div className='loading'>
                <img src={logo} alt="logo" />
                <h1>正在加载中，请稍等...</h1>
            </div>
        )
    }
}
