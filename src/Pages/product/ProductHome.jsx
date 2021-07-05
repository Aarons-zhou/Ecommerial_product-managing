import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqProductList, reqProductSearch, reqProductStatusUpdate } from '../../api'
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
    getProductLists = async (type = 'all', pageNum = this.state.pageNum) => {
        let result
        const pageSize = PAGE_SIZE
        this.setState({ loading: true })
        //判断获取列表还是搜索结果，y:获取列表 n:搜索结果
        type === 'all' ? (
            result = await reqProductList({ pageNum, pageSize })
        ) : (
                result = await reqProductSearch({
                    pageNum,
                    pageSize,
                    [this.state.optionValue]: this.state.inputValue
                })
            )
        this.setState({ loading: false })
        const { status, data: { list: productList, total } } = result.data
        if (status !== 0) message.error('获取商品列表信息失败，请稍后重试~')
        else this.setState({ productList, total })
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
                                const status = product.status === 1 ? 2 : 1
                                const result = await reqProductStatusUpdate({
                                    productId: product._id,
                                    status
                                })
                                const { status: response } = result.data
                                if (response !== 0) message.error('对商品操作失败，请稍后重试~')
                                else this.getProductLists()
                            }}
                        >
                            {product.status === 1 ? '下架' : '上架'}
                        </Button>
                        <span>{product.status === 1 ? '在售' : '已下架'}</span>
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
                    rowKey='_id'
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

