import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.less'
import Login from './Pages/login'
import Admin from './Pages/admin'

class App extends Component {

    componentDidMount(){
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
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
            </Switch>
        )
    }
}

export default connect(
    state => ({ user: state })
)(App)
