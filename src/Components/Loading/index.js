import React from 'react'
import './index.less'

export default function loading() {
    return (
        <div className='loading'>
            <img src={logo} alt="logo" />
            <h1>正在加载中，请稍等...</h1>
        </div>
    )
}
