import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { reqRoleList, reqUserList, reqDeleteUser } from '../../api'
import LinkButton from '../../Components/RenderLinkButton'
import UserForm from './user-form'
import { putServerTime } from '../../utils/transferTime'

const { confirm } = Modal
export default class User extends Component {
    state = {
        users: [],
        roles: [],
        visible: false,
        user: {}
    }

    //发送请求获取用户及角色列表
    getUserList = async () => {
        //用户列表
        const users = await reqUserList()
        if (users instanceof Array && users.length > 0) {
            this.setState({
                users
            })
        } else message.error('请求用户列表失败，请稍后重试')
        //角色列表
        const result = await reqRoleList()
        const { status, data } = result
        if (status === 0) this.setState({ roles: data })
        else message.error('获取角色列表失败，请稍后重试')
    }

    //关闭模态对话框的回调
    handleCancel = (reload = false) => {
        this.setState({
            visible: false,
            user: {}
        })
        if (reload) this.getUserList()
    }

    //删除确认
    showConfirm = user => {
        const _this = this
        const confirmNode = confirm({
            title: '确定注销用户吗？',
            icon: <ExclamationCircleOutlined />,
            content: '注销该用户信息后，将永久不可恢复。',
            async onOk() {
                const result = await reqDeleteUser(user.id)
                if (result === 'success') {
                    message.success('用户删除成功')
                    _this.getUserList()
                } else message.error('用户删除失败，请稍后重试')
                confirmNode.destroy()
            },
        });
    }

    componentDidMount() {
        //发送请求获取用户列表
        this.getUserList()
        //table列信息
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'name'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'createTime',
                render: putServerTime
            },
            {
                title: '所属角色',
                dataIndex: 'roleId',
                render: roleId => {
                    const { roles } = this.state
                    const role = roles.filter(item => roleId * 1 === item.id)
                    if (role.length > 0) return role[0].name
                }
            },
            {
                title: '操作',
                render: user => {
                    return (
                        <span>
                            <LinkButton onClick={() => {
                                this.setState({
                                    user,
                                    visible: true
                                })
                            }}>
                                修改
                            </LinkButton>
                            <LinkButton onClick={() => { this.showConfirm(user) }}>删除</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }
    render() {
        const { users, roles, visible, user } = this.state
        //卡片左上角的信息
        const title = (
            <Button type='primary' onClick={() => { this.setState({ visible: true }) }}>
                创建用户
            </Button>
        )
        return (
            <Card title={title}>
                <Table
                    dataSource={users}
                    columns={this.columns}
                    rowKey='id'
                >
                </Table>
                <UserForm visible={visible} user={user} roles={roles} handleCancel={this.handleCancel} />
            </Card>
        )
    }
}
