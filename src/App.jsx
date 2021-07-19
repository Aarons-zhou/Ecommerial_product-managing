import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Loading from './Components/Loading'
import 'antd/dist/antd.less'

const Login = lazy(() => import('./Pages/login'))
const Admin = lazy(() => import('./Pages/admin'))

class App extends Component {
    componentDidMount() {
        //彩蛋
        const hiddenContext = `
        恭喜你，发现了本网站的管理员账号信息。
    账号：shutiao
    密码：shutiao
        
        请尽情体(rou)验(lin)本网站吧~
        `
        console.log(hiddenContext)
    }
    render() {
        return (
            <Suspense fallback={Loading}>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </Suspense>
        )
    }
}

export default connect(
    state => ({ user: state })
)(App)
