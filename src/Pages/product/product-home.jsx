import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqProductList, reqProductSearchByDesc, reqProductSearchByName, reqProductStatusUpdate } from '../../api'
import { PAGE_SIZE } from '../../constances'
import LinkButton from '../../Components/RenderLinkButton'

const { Option } = Select
export default class ProductHome extends Component {
    state = {
        loading: false,
        optionValue: 'productName',
        inputValue: '',
        productList: [],
        pageNum: 1,
        total: 0
    }

    //获取全部或搜索的商品分页列表
    getProductLists = async (type = 'all') => {
        let result
        const pageSize = PAGE_SIZE
        const { pageNum, inputValue, optionValue } = this.state
        this.setState({ loading: true })
        //获取列表/根据名字/描述搜索
        if (inputValue === '') {
            result = await reqProductList({ pageNum, pageSize })
        } else {
            optionValue === 'productDesc' ? (
                result = await reqProductSearchByDesc([inputValue, pageNum, pageSize])
            ) : (
                    result = await reqProductSearchByName({
                        name: inputValue,
                        pageSize,
                        pageNum,
                    })
                )
        }

        this.setState({ loading: false })
        const { list, total } = result
        if (result && list) {
            this.setState({
                productList: list,
                total
            })
        } else message.error('获取商品列表信息失败，请稍后重试~')
    }

    componentDidMount() {
        //表格列描述
        this.columns = [
            {
                title: '商品名称',
                width: 264,
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                width: 548,
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: 240,
                render: price => <span>￥{price}</span>
            },
            {
                title: '状态',
                width: 240,
                render: product => (
                    <div>
                        <Button
                            style={{ marginRight: 20 }}
                            // 上架下架商品的回调
                            onClick={async () => {
                                let { id, status } = product
                                status = status ? 0 : 1
                                const result = await reqProductStatusUpdate(id, { status })
                                if (result !== 1) message.error('对商品操作失败，请稍后重试~')
                                else this.getProductLists()
                            }}
                        >
                            {product.status ? '下架' : '上架'}
                        </Button>
                        <span>{product.status ? '在售' : '已下架'}</span>
                    </div>
                )
            },
            {
                title: '操作',
                width: 240,
                render: product => (
                    <div>
                        <LinkButton onClick={() => { this.props.history.push('/product/create', { product }) }}>修改商品信息</LinkButton>
                        <LinkButton onClick={() => { this.props.history.push('/product/retrieve', { product }) }}>查看详情</LinkButton>
                    </div>
                )
            },
        ];

        //发送请求获取商品列表
        this.getProductLists()
    }

    render() {
        const { optionValue, productList, total, loading, pageNum } = this.state
        const title = (
            <div>
                <Select
                    value={optionValue}
                    style={{ width: 150 }}
                    onChange={optionValue => { this.setState({ optionValue }) }}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    onChange={event => { this.setState({ inputValue: event.target.value }) }}
                    onPressEnter={() => {
                        this.setState({
                            pageNum: 1
                        }, () => {
                            this.getProductLists('search')
                        })
                    }}
                />
                <Button
                    type='primary'
                    //搜索商品的回调
                    onClick={() => {
                        this.setState({
                            pageNum: 1
                        }, () => {
                            this.getProductLists('search')
                        })
                    }}
                >
                    搜索
                </Button>
            </div>
        )
        const extra = (
            <Button type='primary' onClick={() => { this.props.history.push('/product/create', { product: {} }) }}>
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    bordered
                    rowKey='id'
                    dataSource={productList}
                    columns={this.columns}
                    pagination={{
                        current: pageNum,
                        pageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total: total,
                        simple: true
                    }}
                    //翻页的回调
                    onChange={event => {
                        this.setState({
                            pageNum: event.current
                        }, () => {
                            //发送请求
                            this.state.inputValue ? this.getProductLists('search') : this.getProductLists()
                        })
                    }}
                />
            </Card>
        )
    }
}

