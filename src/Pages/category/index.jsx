import React, { Component } from 'react'
import { Card, Button, Table } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import CategoryModal from './CategoryModal.jsx'
import LinkButton from '../../Components/RenderLinkButton'
import { reqRetrieveCategory } from '../../api'

export default class Category extends Component {
    state = {
        loading: false,
        parentId: 0,
        primaryCategory: [],
        parentName: '',
        secondaryCategory: '',
        visible: 0,                   //0代表不显示模态对话框，1代表显示添加，2代表显示修改
        currentCategory: {}
    }

    //获取一级/二级菜单信息
    getCategory = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
        const result = await reqRetrieveCategory(parentId)
        this.setState({ loading: false })
        const { data, status } = result
        if (status === 0) {
            parentId === 0 ? this.setState({ primaryCategory: data }) : this.setState({ secondaryCategory: data })
        }
    }
    //获取二级菜单信息
    getSecondaryCategory = category => {
        const { _id: parentId, name: parentName } = category
        this.setState({ parentId, parentName }, this.getCategory)
    }
    //返回一级菜单
    backToPrimaryCategory = () => {
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    parentId: 0,
                    parentName: '',
                    secondaryCategory: ''
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
    showUpdateModal = currentCategory => {
        this.setState({
            currentCategory,
            visible: 2
        })
    }

    //关闭模态对话框：清除传递模态对话框的props
    closeModal = () => {
        this.setState({
            visible: 0,
            currentCategory:{},
        })
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
                        <LinkButton onClick={()=>{this.showUpdateModal(category)}}>修改菜单名</LinkButton>
                        {this.state.parentId !== 0 ? null : (
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
        const { parentId, parentName, primaryCategory, secondaryCategory, loading, visible, currentCategory } = this.state
        const props2Modal = {
            visible,
            currentCategory,
            parentId,
            primaryCategory
        }
        const title = parentId === 0 ? '一级分类菜单' : (
            <div>
                <LinkButton onClick={this.backToPrimaryCategory}>一级分类菜单</LinkButton>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </div>
        )

        return (
            <div>
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
                    />
                </Card>
                <CategoryModal props2Modal={props2Modal} getCategory={this.getCategory} closeModal={this.closeModal}/>
            </div>

        )
    }
}
