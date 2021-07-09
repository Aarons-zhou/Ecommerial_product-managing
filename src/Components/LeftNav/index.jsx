import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveTitle } from '../../redux/actions'
import { Menu } from 'antd';
import menuConfig from '../../utils/menuConfig.js'
import logo from '../../Images/logo.png'
import './index.less'

const { SubMenu } = Menu;
class LeftNav extends Component {

    static propTypes = {
        saveTitle: PropTypes.func.isRequired
    }

    //根据配置及权限生成菜单
    menuGenerator = (menuConfig) => {
        const { pathname } = this.props.location
        const { menus } = this.props.user
        return menuConfig.reduce((pre, item) => {
            if (!item.children && menus.indexOf(item.key) !== -1) {
                //判断生成初次selectedKeys和title
                if (pathname.indexOf(item.key) === 0) {
                    this.selectedKeys = item.key
                    this.props.saveTitle(item.title)
                }
                //生成菜单项
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon} onClick={this.pathChange(item)}>{item.title}</Menu.Item>
                )
            } else if (item.children) {
                //判断生成初次openKeys
                const cItem = item.children.find(cItem => {
                    if (pathname.indexOf(cItem.key) !== -1) return true
                    else return false
                })
                if (cItem) {
                    this.openKeys = [item.key]
                }
                //生成含有子级的菜单项
                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.menuGenerator(item.children)}
                    </SubMenu>
                )
            }
            return pre
        }, [])
    }

    //菜单项的点击回调
    pathChange = (item) => {
        return () => {
            this.props.history.push(item.key)
            this.props.saveTitle(item.title)
        }
    }

    //同步生成菜单列表
    menuList = this.menuGenerator(menuConfig)

    render() {
        return (
            <div className='left-nav-wrapper'>
                <div className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>薯条后台</h1>
                </div>
                <Menu
                    defaultOpenKeys={this.openKeys}
                    defaultSelectedKeys={this.selectedKeys}
                    className='left-nav-menu'
                    mode='inline'
                >
                    {this.menuList}
                </Menu>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { saveTitle }
)(withRouter(LeftNav))