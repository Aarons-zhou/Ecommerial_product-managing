import React, { Component } from 'react'
import logo from '../../Images/logo.png'
import './index.less'

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <img src={logo} alt="logo" />
                <h1>欢迎来到薯条商品管理后台</h1>
                <h2>在这里，您可以亲身体验当一名店主（或者是苦逼的电商运营），进行品类/商品的添加、删除及上下架，</h2>
                <h2>员工账号的添加删除，权限的设置等操作，还可查看小店的收入，以制定最适合您的商业策略。</h2>
                <h6>ps:打开控制台（F12）接收彩蛋哦~</h6>
            </div>
        )
    }
}
