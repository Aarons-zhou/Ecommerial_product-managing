import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd';
import { reqCreateCategory, reqUpdateCategory } from '../../api'

const { Option } = Select
export default class CategoryModal extends PureComponent {
    static propTypes = {
        props2Modal: PropTypes.object.isRequired,
        getCategory: PropTypes.func.isRequired
    }

    state = {
        parentId: 0,
    }

    //清空信息及关闭模态对话框的回调
    handleCancel = () => {
        this.props.closeModal()
        // this.formNode.setFieldsValue({
        //     name:''
        // })
    }

    //提交模态对话框的回调
    handleSubmit = async () => {
        //1.获取数据并验证
        const { visible } = this.state
        const data = this.formNode.getFieldsValue()
        try {
            await this.formNode.validateFields()
        } catch (error) {
            message.error('请检查填写内容是否正确')
            return null
        }

        //测试
        console.log(this.formNode.getFieldsValue())
        console.log({
            parentId: data.parentId,
            categoryName: data.name
        });
        console.log({
            categoryId: data.id,
            categoryName: data.name
        });
        //2.发送请求
        let result = {}
        if (visible === 1) {
            result = await reqCreateCategory({
                parentId: data.parentId,
                categoryName: data.name
            })
        } else if (visible === 2) {
            result = await reqUpdateCategory({
                categoryId: data.id,
                categoryName: data.name
            })
        }
        if (result.status === 0) {
            message.success('数据更新成功')
            //3.清空数据及关闭弹窗
            this.handleCancel()
            //4.重新获取数据，刷新页面
            this.props.getCategory()
        } else {
            message.error('服务器开小差啦，请稍后再试~')
        }
    }

    componentDidUpdate() {
        //设置输入框初始值
        const { currentCategory: { name }, parentId } = this.props.props2Modal
        if(this.formNode) this.formNode.setFieldsValue({ name })
        // this.setState({ parentId })
        // console.log(this.state.parentId);
    }

    render() {
        const { visible, parentId, primaryCategory } = this.props.props2Modal
        return (
            <Modal
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
                                value={this.state.parentId}
                                onChange={parentId => {
                                    this.setState({
                                        parentId
                                    })
                                }}
                            >
                                <Option value={0}>一级菜单</Option>
                                {primaryCategory.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='name'
                            // rules={[{ required: true, message: '请输入内容' }]}
                        >
                            分类名称：
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
        )
    }
}
