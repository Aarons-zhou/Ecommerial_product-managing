import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { IMG_BASE } from '../../constances'

const { Item } = List
export default class ProductRetrieve extends Component {
    render() {
        const { name, status, price, images, detail } = this.props.location.state.product
        const title = (
            <div>
                <ArrowLeftOutlined
                    onClick={this.props.history.goBack}
                    style={{ margin: '0 15px' }}
                />
                <span style={{ userSelect: 'none' }}>商品详情</span>
            </div>
        )
        return (
            <Card title={title}>
                <List>
                    <Item style={{ display: 'block' }}>
                        <span className='product-left-title'>
                            商品名称:
                        </span>
                        <span>{name}</span>
                    </Item>
                    <Item style={{ display: 'block' }}>
                        <span className='product-left-title'>
                            商品状态:
                        </span>
                        <span>{status? '已下架' : '在售'}</span>
                    </Item>
                    <Item style={{ display: 'block' }}>
                        <span className='product-left-title'>
                            商品价格:
                        </span>
                        <span>￥{price}</span>
                    </Item>
                    <Item style={{ display: 'block' }}>
                        <span className='product-left-title'>
                            商品图片:
                        </span>
                        {images instanceof Array ? (
                            images.map(item => <img src={`${IMG_BASE}upload/${item}`} alt='img' />)
                        ) : (
                                <span>暂无</span>
                            )}
                    </Item>
                    <Item style={{ display: 'block' }}>
                        <span className='product-left-title'>
                            商品详情:
                        </span>
                        <span className='product-detail-retrieve' dangerouslySetInnerHTML={{ __html: detail }} />
                    </Item>
                </List>
            </Card>
        )
    }
}
