import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqRetrieveCategory, reqProductUpdate, reqProductCreate } from '../../api'
import PictureWall from './picture-wall'
import RichTextEditor from './rich-context-editor';

const { TextArea } = Input

export default class ProductCreate extends Component {

    state = {
        options: [],
    }

    //动态获取Cascader二级信息
    loadData = async selectedOption => {
        const { options } = this.state
        const pcategoryId = selectedOption[0].value
        //发送请求获取二级分类列表
        selectedOption[0].loading = true;
        const cOptions = await this.getCategory(pcategoryId)
        selectedOption[0].loading = false;
        //遍历寻到被选中的元素位置
        const index = options.findIndex(item => item.value === pcategoryId * 1)
        //处理二级分类列表
        if (cOptions) {
            options[index].children = cOptions
            this.setState({ options })
        } else {
            options[index].isLeaf = true
            this.setState({ options })
        }
    }

    //获取一级/二级菜单信息
    getCategory = async parentId => {
        const result = await reqRetrieveCategory(parentId)
        if (result.status === 0) {
            const options = result.data.map(item => ({
                value: item.id,
                label: item.name,
                isLeaf: parentId === 0 ? false : true                       //是否叶子（无分支）
            }))
            return options
        }
    }

    //表单提交成功的回调
    onFinish = async value => {
        const { name, desc, price, categoryIds } = value
        const { id, idStr, status } = this.props.location.state.product
        //处理pcategoryId及categoryId
        let pcategoryId, categoryId
        if (categoryIds.length === 1) {
            pcategoryId = '0'
            categoryId = categoryIds[0] + ""
        } else {
            pcategoryId = categoryIds[0] + ""
            categoryId = categoryIds[1] + ""
        }
        //处理imgs数组
        const images = this.imgsRef.state.fileList
        console.log(images[0].thumbUrl);
        //处理富文本编辑器
        const detail = this.RTERef.state.editorState.toHTML()
        //发送请求
        let result
        if (id) {
            //发送修改商品的请求
            result = await reqProductUpdate({ id, idStr, name, status, desc, price, pcategoryId, categoryId, detail })
        } else {
            //发送添加商品的请求
            result = await reqProductCreate({ name, desc, price, pcategoryId, categoryId, detail, status: 0 })
        }
        //处理响应
        if (result.status === 0) {
            message.success('信息提交成功')
            this.props.history.goBack()
        } else {
            message.error('上传失败，请稍后重试')
        }
    }
    //表单提交失败的回调
    onFinishFailed = err => {
        message.error('商品信息有误，请检查' + err)
    }

    async componentDidMount() {
        //初次获取Casecader的一级菜单数据
        const options = await this.getCategory(0)
        //修正数据
        if (options instanceof Array) {
            options.unshift({
                value: 0,
                label: '暂未分类',
                isLeaf: true
            })
        }
        this.setState({ options })
        
        //初次获取Casecader的初始值的二级菜单数据
        const { pcategoryId } = this.props.location.state.product
        if (pcategoryId * 1 > 0) {
            //给pcategoryId包结构以复用loadData方法
            const wrapper = [{ value: pcategoryId }]
            this.loadData(wrapper)
        }
    }

    render() {
        //处理添加商品页面的initialValues
        const { name, desc, price, categoryId, pcategoryId, detail } = this.props.location.state.product
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
                        categoryIds: !pcategoryId ? '' : (pcategoryId === '0' ? [categoryId * 1] : [pcategoryId * 1, categoryId * 1]),
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
                        *服务器尚未支持图片传输功能，请见谅
                    </Form.Item>
                    <Form.Item
                        label='商品详情'
                        rules={[]}
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 15 }}
                    >
                        <RichTextEditor ref={c => this.RTERef = c} detail={detail} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>提交</Button>
                </Form>
            </Card>
        )
    }
}
