import React, { Component } from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'
import ProductHome from './ProductHome'
import ProductCreate from './ProductCreate'
import ProductRetrieve from './ProductRetrieve'
import './index.less'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/product' component={ProductHome} exact/>
                    <Route path='/product/create' component={ProductCreate}/>
                    <Route path='/product/retrieve' component={ProductRetrieve}/>
                    <Redirect to='/product'/>
                </Switch>
            </div>
        )
    }
}
