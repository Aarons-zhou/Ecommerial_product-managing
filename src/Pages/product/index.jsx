import React, { Component } from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'
import ProductHome from './product-home'
import ProductCreate from './product-create'
import ProductRetrieve from './product-retrieve'
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
