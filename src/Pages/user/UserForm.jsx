import React, { PureComponent } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { reqUpdateUser, reqAddUser } from '../../api'

const { Option } = Select

export default class UserForm extends PureComponent {
    //设置form.item的样式
    colunmsCol = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 }
    }

    //发送修改/添加请求
    reqUser = async data => {
        const { user } = this.props
        let result
        if (user._id) {
            result = await reqUpdateUser({
                ...data,
                _id: user._id
            })
        } else {
            result = await reqAddUser(data)
        }
        if (result.data.status === 0) {
            message.success('操作成功')
            this.props.handleCancel(true)
        } else {
            message.error('操作失败，请稍后重试')
        }
    }

    //模态对话框的ok回调
    onOk = async () => {
        try {
            await this.formNode.validateFields()
            const data = this.formNode.getFieldsValue()
            this.reqUser(data)
        } catch (error) {
            message.error('提交内容有误，请检查')
        }
    }

    render() {
        const { roles, user, visible, handleCancel } = this.props
        if (this.formNode) {
            this.formNode.setFieldsValue({
                username: user.username,
                password: user.password,
                phone: user.phone,
                email: user.email
            })
        }
        return (
            <Modal
                title={user._id ? '修改用户' : '添加用户'}
                visible={visible}
                // footer={null}
                onOk={this.onOk}
                onCancel={() => { handleCancel(false) }}
            >
                <Form
                    onFinish={this.onFinish}
                    ref={c => this.formNode = c}
                >
                    <Form.Item
                        label='用户名'
                        name='username'
                        initialValue={user.username ? user.username : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: 'is required' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {user._id ? null : (
                        <Form.Item
                            label='密码'
                            name='password'
                            initialValue={user.password ? user.password : ''}
                            {...this.colunmsCol}
                            rules={[
                                { required: true, message: 'is required' }
                            ]}
                        >
                            <Input type='password'/>
                        </Form.Item>)}

                    <Form.Item
                        label='手机号'
                        name='phone'
                        initialValue={user.phone ? user.phone : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: 'is required' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='邮箱'
                        name='email'
                        initialValue={user.email ? user.email : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: 'is required' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='角色'
                        name='role_id'
                        initialValue={user.role_id ? user.role_id : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: 'is required' }
                        ]}
                    >
                        <Select>
                            {roles.map(item => (<Option value={item._id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
