import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Table, Button, Modal, Input, Tree, Form, message } from 'antd'
import { logout } from '../../redux/actions'
import { reqRoleList, reqCreateRole, reqUpdateRole } from '../../api'
import menuList from '../../utils/menuConfig.js'
import { localStorageUser } from '../../utils/localStorage'
import { putServerTime, transferTime } from '../../utils/transferTime'
import './index.less'

//定义列信息
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        render: putServerTime
    },
    {
        title: '授权时间',
        dataIndex: 'authTime',
        render: putServerTime
    },
    {
        title: '授权人',
        dataIndex: 'authName',
    },
];

class Role extends Component {
    state = {
        roleList: [],
        chosenRole: [],
        isCreateVisible: false,
        isAuthVisible: false,
        currentRole: {},
    }
    
    //发送请求获取角色列表
    getRoleList = async () => {
        const result = await reqRoleList()
        const { status, data } = result
        if (status === 0) this.setState({ roleList: data })
        else message.error('获取角色列表失败，请稍后重试')
    }

    //创建角色成功的回调
    createOk = async () => {
        const roleName = this.inputNode.state.value
        const result = await reqCreateRole(roleName)
        console.log(result);
        if (result === 'success') {
            message.success('添加角色成功')
            this.cancelCreate()
            this.getRoleList()
        } else {
            message.error('添加角色失败，请稍后再试')
        }
    }

    //创建角色取消的回调
    cancelCreate = () => {
        this.setState({ isCreateVisible: false })
        this.inputNode.state.value = ''
    }

    //获取默认显示信息
    getDefaultInfo = () => {
        const { roleList, chosenRole } = this.state
        const { id, name, menus, createTime } = roleList.find(item => item.id === chosenRole[0])
        const menusArr = menus.split(',')
        if (menusArr.indexOf('/home') === -1) {
            menusArr.unshift('/home')
        }
        this.setState({
            currentRole: {
                id,
                name,
                menusArr,
                createTime
            }
        })
    }

    //树形图选项更改的回调
    onCheck = menusArr => {
        this.setState(state => ({
            currentRole: {
                ...state.currentRole,
                menusArr
            }
        }))
    }

    //设置权限成功的回调
    AuthOk = async () => {
        const { user, logout } = this.props
        const authName = user.name
        const { id, name, menusArr, createTime } = this.state.currentRole
        const menus = menusArr.join(',')
        const result = await reqUpdateRole(id, {
            name,
            authName,
            authTime: transferTime(Date.now()),                         //修正服务器时间
            createTime: putServerTime(createTime),
            menus,
            v: 0
        })
        if (result === 'success') {
            //判断设置的是否为自我权限
            if (id === user.roleId * 1) {
                message.success('权限更新成功，请重新登陆')
                logout()
                localStorageUser.clearUser()
                this.props.history.go('/login')
            } else {
                message.success('权限设置成功')
                this.cancelAuth()
                this.getRoleList()
            }
        }
        else message.error('权限设置失败，请稍后重试')
    }

    //设置权限取消的回调
    cancelAuth = () => {
        this.setState({
            isAuthVisible: false,
            currentRole: {}
        })
    }

    componentDidMount() {
        this.getRoleList()
    }

    render() {
        const { roleList, chosenRole, isCreateVisible, isAuthVisible, currentRole: { name, menusArr } } = this.state
        //设置树形列表
        menuList[0].disabled = true
        const treeList = [{
            title: '平台权限',
            key: 'all',
            children: [...menuList]
        }]
        //设置Card左上角显示内容
        const title = (
            <span>
                <Button
                    type='primary'
                    className='create-button'
                    onClick={() => { this.setState({ isCreateVisible: true }) }}
                >
                    创建角色
                </Button>
                <Button
                    type='primary'
                    disabled={chosenRole.length === 0 ? true : false}
                    onClick={() => { this.setState({ isAuthVisible: true }); this.getDefaultInfo() }}
                >
                    设置权限
                </Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    rowKey='id'
                    rowSelection={{
                        type: 'radio',
                        onChange: chosenRole => { this.setState({ chosenRole }) },
                        selectedRowKeys: this.state.chosenRole
                    }}
                    onRow={record => {
                        return {
                            onClick: () => { this.setState({ chosenRole: [record.id] }) },
                        };
                    }}
                    columns={columns}
                    dataSource={roleList}
                />
                <Modal
                    title="添加角色"
                    visible={isCreateVisible}
                    onOk={this.createOk}
                    onCancel={this.cancelCreate}
                >
                    <Input
                        placeholder='请输入角色名称'
                        ref={c => this.inputNode = c}
                    />
                </Modal>
                <Modal
                    title="设置权限"
                    className='AuthModal'
                    visible={isAuthVisible}
                    onOk={this.AuthOk}
                    onCancel={this.cancelAuth}
                >
                    <Form.Item
                        label='角色名称'
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 17 }}
                    >
                        <Input
                            disabled
                            value={name}
                        />
                    </Form.Item>
                    <Tree
                        checkable
                        defaultExpandAll
                        selectable={false}
                        checkedKeys={menusArr}
                        onCheck={this.onCheck}
                        treeData={treeList}
                    />
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { logout }
)(Role)