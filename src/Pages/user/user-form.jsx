import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd'
import { reqUpdateUser, reqCreateUser } from '../../api'

const { Option } = Select

export default class UserForm extends PureComponent {
    static propTypes = {
        visible:PropTypes.bool.isRequired,
        user:PropTypes.object.isRequired,
        roles:PropTypes.array.isRequired,
        handleCancel:PropTypes.func.isRequired
    }

    //设置form.item的样式
    colunmsCol = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 }
    }

    //发送修改/添加请求
    reqUser = async data => {
        const { id } = this.props.user
        let result
        if (id) {
            result = await reqUpdateUser(id, data)
        } else {
            result = await reqCreateUser(data)
        }
        if (result === 'success') {
            message.success('操作成功')
            this.onCancel(true)
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

    //模态对话框的cancel回调
    onCancel = (reload) => {
        const { handleCancel } = this.props
        handleCancel(reload)
    }

    componentDidUpdate() {
        const { id, name, phone, email, roleId } = this.props.user
        if (this.formNode && id) {
            this.formNode.setFieldsValue({
                name: name,
                phone: phone,
                email: email,
                roleId: roleId * 1
            })
        }
    }

    render() {
        const { roles, user: { id, name, phone, email, roleId }, visible } = this.props

        return (
            <Modal
                title={id ? '修改用户' : '添加用户'}
                visible={visible}
                onOk={this.onOk}
                onCancel={()=>{this.onCancel(false)}}
                destroyOnClose={true}
            >
                <Form
                    onFinish={this.onFinish}
                    ref={c => this.formNode = c}
                    preserve={false}
                >
                    <Form.Item
                        label='用户名'
                        name='name'
                        initialValue={name ? name : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: '缺少用户名' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='密码'
                        name='password'
                        initialValue=''
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: '缺少密码' }
                        ]}
                    >
                        <Input.Password visibilityToggle />
                    </Form.Item>

                    <Form.Item
                        label='手机号'
                        name='phone'
                        initialValue={phone ? phone : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: '缺少手机号' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='邮箱'
                        name='email'
                        initialValue={email ? email : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: '缺少邮箱' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='角色'
                        name='roleId'
                        initialValue={roleId ? roleId * 1 : ''}
                        {...this.colunmsCol}
                        rules={[
                            { required: true, message: '缺少角色' }
                        ]}
                    >
                        <Select>
                            {roles.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
