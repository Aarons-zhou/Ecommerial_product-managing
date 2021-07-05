import React, { Component } from 'react'
import { Card, Table, Button,Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { reqUserList, reqDeleteUser } from '../../api'
import LinkButton from '../../Components/RenderLinkButton'
import UserForm from './UserForm'
import transferTime from '../../utils/transferTime'

const { confirm } = Modal
export default class User extends Component {
    state = {
        users: [],
        roles: [],
        visible: false,
        user: {}
    }

    //发送请求获取用户列表
    getUserList = async () => {
        const result = await reqUserList()
        const { status, data: { users, roles } } = result.data
        if (status === 0) {
            this.setState({ users, roles })
        }
    }

    //关闭模态对话框的回调
    handleCancel = (reload) => {
        this.setState({
            visible: false,
            user: {}
        })
        if (reload) this.getUserList()
    }

    //删除确认
    showConfirm = (user,callback) => {
        confirm({
            title: '确定注销用户吗？',
            icon: <ExclamationCircleOutlined />,
            content: '注销该用户信息后，将永久不可恢复。',
            async onOk() {
                const result = await reqDeleteUser({userId:user._id})
                if(result.data.status===0) {
                    message.success('用户删除成功')
                    callback()
                }else message.error('用户删除失败，请稍后重试')
            },
            onCancel() {
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
                dataIndex: 'username'
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
                dataIndex: 'create_time',
                render: transferTime
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => {
                    const { roles } = this.state
                    const role = roles.filter(item => role_id === item._id)
                    if (role.length > 0) {
                        return role[0].name
                    }
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
                            <LinkButton onClick={() => {this.showConfirm(user,this.getUserList)}}>删除</LinkButton>
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
                    rowKey='_id'
                >
                </Table>
                <UserForm visible={visible} user={user} roles={roles} handleCancel={this.handleCancel} />
            </Card>
        )
    }
}
