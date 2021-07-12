import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login, tempLogin } from '../../redux/actions';
import LinkButton from '../RenderLinkButton'

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 18 },
};

class LoginAntd extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired
    }

    //表单验证成功的回调
    onFinish = user => {
        const { username, password } = user
        const { login } = this.props
        login(username, password)
    }
    //表单验证失败的回调
    onFinishFailed = data => {
        message.error('验证失败：' + data.errorFields[0].errors[0])
    }

    //游客登录的点击回调
    touristLogin = () => {
        const { tempLogin } = this.props
        tempLogin()
    }

    render() {
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: false }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住账号</Checkbox>

                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <LinkButton style={{marginLeft:'20px'}} onClick={this.touristLogin}>游客访问</LinkButton>
                </Form.Item>

            </Form>
        );
    }
}

export default connect(
    state => ({}),
    { login, tempLogin }
)(withRouter(LoginAntd))