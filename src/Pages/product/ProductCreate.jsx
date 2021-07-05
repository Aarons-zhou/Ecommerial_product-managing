import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqRetrieveCategory, reqProductCreate } from '../../api'
import PictureWall from './PictureWall'
import RichTextEditor from './RichTextEditor';

const { TextArea } = Input

export default class ProductCreate extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired
    }

    state = {
        options: [],
    }

    //动态获取Cascader二级信息
    loadData = async selectedOption => {
        const { options } = this.state
        const parentId = selectedOption[0].value
        //遍历寻到需要替换元素的位置
        const index = options.findIndex(item => item.value === selectedOption[0].value)
        selectedOption[0].loading = true;
        const cOptions = await this.getCategory(parentId)
        selectedOption[0].loading = false;
        if (cOptions.length > 0) {
            //给选定位置的元素添加children属性
            options[index].children = cOptions
            this.setState({ options })
        } else {
            options[index].isLeaf = true
            this.setState({ options })
        }
    }

    //获取一级/二级菜单信息
    getCategory = async parentId => {
        const result = await reqRetrieveCategory({ parentId })
        if (result.data.status === 0) {
            const options = result.data.data.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: parentId === 0 ? false : true                       //是否叶子（无分支）
            }))
            if (parentId === 0) this.setState({ options: options.slice(0, 49) })
            return options
        }
    }

    //表单提交成功的回调
    onFinish = async value => {
        const { name, desc, price, categoryIds } = value
        //处理pCategoryId及categoryId
        let pCategoryId
        let categoryId
        if (categoryIds.length === 1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
        } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }
        //处理imgs数组
        const imgs = this.imgsRef.state.fileList
        //处理富文本编辑器
        const detail = this.RTERef.state.editorState.toHTML()
        //发送请求
        const result = await reqProductCreate({ name, desc, price, pCategoryId, categoryId, imgs, detail })
        if (result.data.status === 0) {
            message.success('信息提交成功')
            this.props.history.goBack()
        } else {
            message.error('上传失败，请稍后重试')
        }
    }
    //表单提交失败的回调
    onFinishFailed = err => {
        message.error('商品信息有误，请检查')
    }

    async componentDidMount() {
        const { pCategoryId } = this.props.location.state.product
        //初次获取Casecader的一级菜单数据
        await this.getCategory(0)
        //初次获取Casecader的初始值的二级菜单数据
        if (pCategoryId && pCategoryId !== 0) {
            //给pCategoryId包结构，伪装成selectedOption以复用loadData方法
            const wrapper = [{ value: pCategoryId }]
            this.loadData(wrapper)
        }
    }

    render() {
        //处理添加商品页面的initialValues
        const { name, desc, price, categoryId, pCategoryId, detail } = this.props.location.state.product
        let categoryIds
        if (pCategoryId) {
            categoryIds = [categoryId]
        } else {
            categoryIds = [pCategoryId, categoryId]
        }
        //card左上角
        const title = (
            <div>
                <ArrowLeftOutlined
                    onClick={this.props.history.goBack}
                    style={{ margin: '0 15px' }}
                />
                <span>{this.props.location.state ? '修改商品' : '添加商品'}</span>
            </div>
        )
        //设置form的栅格布局
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        return (
            <Card title={title}>
                <Form
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    initialValues={{
                        name: name || '',
                        desc: desc || '',
                        price: price || '',
                        categoryIds: !pCategoryId ? '' : (pCategoryId === 0 ? [categoryId] : [pCategoryId, categoryId]),
                        detail: detail || '',
                    }}
                >
                    <Form.Item
                        label='商品名称'
                        name='name'
                        {...layout}
                        rules={[
                            { required: true, message: '商品名称不能为空' }
                        ]}
                    >
                        <Input
                            placeholder='请输入商品名称'
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        label='商品描述'
                        name='desc'
                        {...layout}
                        validateTrigger='onBlur'
                        rules={[
                            { required: true, message: '商品描述不能为空' },
                            // { min: 15, message: '商品描述不少于15字' }
                        ]}
                    >
                        <TextArea
                            placeholder="请输入商品描述(不少于15字)"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        label='商品价格'
                        name='price'
                        {...layout}
                        validateFirst={true}
                        rules={[
                            { required: true, message: '商品价格不能为空' },
                            {
                                validator: (_, value) => value && value > 0 ? Promise.resolve() : Promise.reject(),
                                message: '异常价格'
                            }
                        ]}
                    >
                        <Input
                            type='number'
                            addonAfter={<span style={{ margin: '0 5px' }}>元</span>}
                        />
                    </Form.Item>
                    <Form.Item
                        label='商品分类'
                        name='categoryIds'
                        {...layout}
                        rules={[
                            { required: true, message: '商品分类不能为空' }
                        ]}
                    >
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            placeholder="请输入商品分类"
                        />
                    </Form.Item>
                    <Form.Item
                        label='商品图片'
                        {...layout}
                    >
                        <PictureWall ref={c => this.imgsRef = c} />
                    </Form.Item>
                    <Form.Item
                        label='商品详情'
                        rules={[]}
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 15 }}

                    >
                        <RichTextEditor ref={c => this.RTERef = c} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>提交</Button>
                </Form>
            </Card>
        )
    }
}
