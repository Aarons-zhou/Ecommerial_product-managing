import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginAntd from '../../Components/LoginAntd'
import logo from '../../Images/logo.png'
import './index.less'

class Login extends Component {
    render() {
        const { user } = this.props
        return user ? <Redirect to='/' /> : (
            <div className='login-wrapper'>
                <header>
                    <img src={logo} alt='logo' />
                    <span>薯条后台管理系统</span>
                </header>
                <main className='clearfix'>
                    <div>
                        <h1>用户登录</h1>
                        <LoginAntd />
                    </div>
                </main>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Login)