import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import LinkButton from '../RenderLinkButton'
import { logout } from '../../redux/actions'
import transferTime from '../../utils/transferTime'
import { reqIP, reqWeather } from '../../api'
import './index.less'

class AdminHeader extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    }

    state = {
        isConfirmLogoutVisible: false,
        time: transferTime(new Date()),
        city : '',
        temperature : '',
        weather: ''
    }

    //退出登录的点击回调
    confirmLogout = () => {
        this.setState({ isConfirmLogoutVisible: true })
    }

    //确认退出模态框的成功回调
    confirmLogoutOk = () => {
        this.props.logout()
    }
    //确认退出模态框的失败回调
    confirmLogoutCancel = () => {
        this.setState({ isConfirmLogoutVisible: false })
    }
    //获取时间到state中
    getTime = () => {
        const dateInstance = new Date()
        const time = transferTime(dateInstance)
        this.setState({ time })
    }
    //获取IP和天气
    getWeather = async () => {
        const key = '5f582d5aba14bbfabb74ef67b6e2fb04'
        //获取IP
        const resultIp = await reqIP({ key })
        const { status, adcode, infocode } = resultIp
        if (status === '1' && infocode === '10000') {
            //根据IP获取地区及天气信息
            const resultWeather = await reqWeather({
                key,
                city: adcode,
                extensions: 'base'
            })
            const { status, infocode, lives } = resultWeather
            if (status === '1' && infocode === '10000') {
                const { province, city, temperature, weather } = lives[0]
                this.setState({
                    city:`${province}-${city}`,
                    temperature:`${temperature}℃`,
                    weather
                })
            }
        }
    }

    componentDidMount() {
        //开启定时器，更新时间
        setInterval(() => {
            this.getTime()
        }, 1000);
        //获取地区及天气信息
        this.getWeather()
    }

    render() {
        const { user, title } = this.props
        const { isConfirmLogoutVisible, time, city, temperature, weather } = this.state
        return (
            <div className='admin-header-wrapper'>
                <div className='admin-header-upper-layer'>
                    <span className='admin-header-upper-layer-wrapper'>
                        <span>Hello, {user.name}</span>
                        <LinkButton onClick={this.confirmLogout} style={{marginRight:'22px'}}>退出登录</LinkButton>
                    </span>
                </div>
                <div className='admin-header-lower-layer'>
                    <span className='admin-header-lower-layer-left'>{title}</span>
                    <span className='admin-header-lower-layer-right'>
                        <span className='time'>{time}</span>
                        <span className='time'>{city}</span>
                        <span className='weather'>{`${weather} ${temperature}`}</span>
                    </span>
                </div>
                <Modal title="退出登录" visible={isConfirmLogoutVisible} onOk={this.confirmLogoutOk} onCancel={this.confirmLogoutCancel}>
                    <p>确认退出登录吗？</p>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        title: state.title
    }),
    { logout }
)(AdminHeader)