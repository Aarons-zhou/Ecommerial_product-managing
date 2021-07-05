import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../Components/LeftNav'
import AdminHeader from '../../Components/AdminHeader'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import ChartBar from '../charts/bar'
import ChartLine from '../charts/line'
import ChartPie from '../charts/pie'
import { logout } from '../../redux/actions'
import './index.less'

const { Header, Footer, Sider, Content } = Layout

class Admin extends Component {
    render() {
        const { user } = this.props

        //如果没有登录信息则返回Login,有登录信息则进入Admin
        return !user ? <Redirect to='/login' /> : (
            <Layout className='layout-wrapper'>
                <div className='layout-wrapper-background-image'></div>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>
                        <AdminHeader />
                    </Header>
                    <Content className='main-content'>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/chart/bar' component={ChartBar} />
                            <Route path='/chart/line' component={ChartLine} />
                            <Route path='/chart/pie' component={ChartPie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer>使用Chrome浏览器获得更佳体验效果</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state => ({ user: state.user }),
    { logout }
)(withRouter(Admin))