import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../Components/RenderLinkButton'
import { reqRetrieveCategory, reqUpdateCategory, reqCreateCategory } from '../../api'

const { Option } = Select

export default class Category extends Component {
    state = {
        loading: false,
        primaryCategory: [],
        secondaryCategory: [],
        currentCategory: {
            id: '',                                  //当前操作的菜单项id，只有修改时有值
            name: '',                                //当前操作的菜单项名字
            parentId: 0,
            parentName: '一级分类',
            createParentId: 0,
            createParentName: '一级分类'
        },
        visible: 0                   //0代表不显示模态对话框，1代表显示添加，2代表显示修改
    }
    //在一级列表中，根据id寻找name
    getNameById = (parentId) => {
        const list = this.state.primaryCategory
        const { name } = list.find(item => item.id === parentId)
        return name
    }

    //获取一级/二级菜单信息
    getCategory = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state.currentCategory
        const result = await reqRetrieveCategory(parentId)
        this.setState({ loading: false })
        if (result.status === 0) {
            parentId === 0 ? this.setState({ primaryCategory: result.data }) : this.setState({ secondaryCategory: result.data })
        }
    }
    //获取二级菜单信息
    getSecondaryCategory = category => {
        const { id: parentId, name: parentName } = category
        this.setState({
            currentCategory: {
                id: '',
                name: '',
                parentId,
                parentName,
                createParentId: parentId,
                createParentName: parentName
            },
        }, this.getCategory)
    }
    //返回一级菜单
    backToPrimaryCategory = () => {
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    secondaryCategory: [],
                    currentCategory: {
                        id: '',                                  //当前操作的菜单项id，只有修改时有值
                        name: '',                                //当前操作的菜单项名字
                        parentId: 0,
                        parentName: '一级分类',
                        createParentId: 0,
                        createParentName: '一级分类'
                    },
                })
            }, 80)
        })
    }

    //弹出添加模态对话框
    showCreateModal = () => {
        this.setState({
            visible: 1,
        })
    }
    //弹出修改模态对话框
    showUpdateModal = category => {
        const { id, name } = category
        this.setState(state => {
            return {
                visible: 2,
                currentCategory: {
                    ...state.currentCategory,
                    id,
                    name
                }
            }
        })
        //初始化输入框内容
        this.formNode.setFieldsValue({
            name: category.name
        })
    }

    //关闭模态对话框并清除数据的回调
    handleCancel = () => {
        this.setState(state => {
            return {
                visible: 0,
                currentCategory: {
                    ...state.currentCategory,
                    id: '',
                    name: '',
                    createParentId: state.currentCategory.parentId,
                    createParentName: state.currentCategory.parentName
                }
            }
        })
        //清空输入框内容
        this.formNode.setFieldsValue({
            name: ''
        })
    }

    //模态对话框的提交回调
    handleSubmit = async () => {
        //获取数据
        let { visible, currentCategory: { id, parentId, createParentId, createParentName } } = this.state
        const { name } = this.formNode.getFieldValue()
        let result = {}

        //验证数据
        try {
            await this.formNode.validateFields()
        } catch (e) {
            message.error('请检查内容')
            return
        }

        //提交数据
        if (visible === 1) {
            result = await reqCreateCategory({
                parentId: createParentId,
                name,
                parentName: createParentName,
                categoryName: createParentId === 0 ? '一级分类' : '二级分类'
            })
        } else if (visible === 2) {
            result = await reqUpdateCategory({
                id,
                name,
                parentId: createParentId,
                parentName: createParentName,
                categoryName: createParentId === 0 ? '一级分类' : '二级分类'
            })
        }

        //处理响应
        if (result.status !== 0) {
            message.error('服务器开小差啦，请稍后再试~')
        } else {
            message.success('提交成功')
            this.handleCancel()
            //按需刷新
            if (createParentId === parentId || createParentId === 0) this.getCategory()
        }
    }

    componentDidMount() {
        //定义表格列信息
        this.columns = [
            {
                title: '菜单名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: 'operation',
                key: 'operation',
                render: (_, category) => (
                    <div>
                        <LinkButton onClick={() => { this.showUpdateModal(category) }}>修改菜单名</LinkButton>
                        {this.state.currentCategory.parentId !== 0 ? null : (
                            <LinkButton onClick={() => this.getSecondaryCategory(category)}>查看菜单</LinkButton>
                        )}
                    </div>
                )
            },
        ];
        //初次获取一级菜单
        this.getCategory()
    }
    render() {
        const { primaryCategory, secondaryCategory, loading, visible, currentCategory: { parentId, parentName, createParentId } } = this.state
        const title = parentId === 0 ? '一级分类菜单' : (
            <div>
                <LinkButton onClick={this.backToPrimaryCategory}>一级分类菜单</LinkButton>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </div>
        )
        return (
            <div>
                {/* 主体页面 */}
                <Card title={title} extra={(
                    <Button type='primary' onClick={this.showCreateModal}>
                        <PlusOutlined />
                            添加
                    </Button>
                )}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={parentId === 0 ? primaryCategory : secondaryCategory}
                        columns={this.columns}
                        rowKey='id'
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                    />;
                </Card>
                {/* 模态对话框 */}
                <Modal
                    forceRender={true}
                    title={visible === 1 ? '添加菜单项' : '修改菜单项'}
                    visible={visible === 0 ? false : true}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    {visible === 1 ? (
                        <Form ref={c => { this.formNode = c }}>
                            <Form.Item>
                                所属分类：
                                <Select
                                    value={createParentId}
                                    onChange={createParentId => {
                                        this.setState(state => {
                                            return {
                                                currentCategory: {
                                                    ...state.currentCategory,
                                                    createParentId,
                                                    createParentName: this.getNameById(createParentId)
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <Option value={0}>一级菜单</Option>
                                    {primaryCategory.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <span>分类名称：</span>
                            <Form.Item
                                name='name'
                                rules={[{ required: true, message: '请输入内容' }]}
                            >
                                <Input
                                    placeholder='请输入分类名称'
                                    allowClear={true}
                                    onPressEnter={this.handleSubmit}
                                />
                            </Form.Item>
                        </Form>
                    ) : (
                            <Form ref={c => { this.formNode = c }}>
                                <Form.Item
                                    name='name'
                                    rules={[{ required: true, message: '请输入内容' }]}
                                >
                                    <Input
                                        placeholder='请输入分类名称'
                                        allowClear={true}
                                        onPressEnter={this.handleSubmit}
                                    />
                                </Form.Item>
                            </Form>
                        )}
                </Modal>
            </div>
        )
    }
}
