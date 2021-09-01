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
        console.log("%c\n       ", "font-size:240px;background:url('http://tiebapic.baidu.com/forum/w%3D580/sign=ff625e75d4cec3fd8b3ea77de689d4b6/d94dd7550923dd54103e04d1c609b3de9d82489d.jpg') no-repeat 0 -10px");
    }
    //
    render() {
        return (
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </Suspense>
        )
    }
}

export default connect(
    state => ({ user: state })
)(App)
