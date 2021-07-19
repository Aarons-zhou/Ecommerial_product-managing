import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../Components/LeftNav'
import AdminHeader from '../../Components/AdminHeader'
import Loading from '../../Components/Loading'
import { logout } from '../../redux/actions'
import './index.less'

const Home = lazy(() => import('../home'))
const Category = lazy(() => import('../category'))
const Product = lazy(() => import('../product'))
const Role = lazy(() => import('../role'))
const User = lazy(() => import('../user'))
const ChartBar = lazy(() => import('../charts/bar'))
const ChartLine = lazy(() => import('../charts/line'))
const ChartPie = lazy(() => import('../charts/pie'))

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
                        <Suspense fallback={Loading}>
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
                        </Suspense>
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