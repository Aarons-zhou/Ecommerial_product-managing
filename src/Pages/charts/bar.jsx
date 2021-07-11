/*
	整个畅销榜，按月份分 每个月份多个商品集中在一起



	1.上方 layout 选取月份   ok
	2.中间 table 显示数据
	3.下方（大块） bizCharts 可视化

	一个图标是一个arr 一个项是一个obj
*/
import React, { Component } from 'react'
import { Layout, Menu, Table } from 'antd'
import { Chart, Interval, Tooltip, Axis } from 'bizcharts'
import './index.less'

const { Header } = Layout

//模拟日期数据，请忽略
const dateArr = ['2021-06', '2021-05', '2021-04', '2021-03', '2021-02', '2021-01',
	'2020-12', '2020-11', '2020-10', '2020-09', '2020-08', '2020-07',
	'2020-06', '2020-05', '2020-04', '2020-03', '2020-02', '2020-01']

//模拟商品数据，请忽略
const salesArr = [
	[
		{ item: '商品1', sales: 208 },
		{ item: '商品2', sales: 371 },
		{ item: '商品3', sales: 167 },
		{ item: '商品4', sales: 613 },
		{ item: '商品5', sales: 412 },
		{ item: '商品6', sales: 395 },
		{ item: '商品7', sales: 167 },
		{ item: '商品8', sales: 351 },
		{ item: '商品9', sales: 286 },
		{ item: '商品10', sales: 198 }
	],
	[
		{ item: '商品1', sales: 167 },
		{ item: '商品2', sales: 431 },
		{ item: '商品3', sales: 197 },
		{ item: '商品4', sales: 498 },
		{ item: '商品5', sales: 276 },
		{ item: '商品6', sales: 125 },
		{ item: '商品7', sales: 672 },
		{ item: '商品8', sales: 392 },
		{ item: '商品9', sales: 218 },
		{ item: '商品10', sales: 172 }
	],
	[
		{ item: '商品1', sales: 513 },
		{ item: '商品2', sales: 431 },
		{ item: '商品3', sales: 287 },
		{ item: '商品4', sales: 512 },
		{ item: '商品5', sales: 345 },
		{ item: '商品6', sales: 89 },
		{ item: '商品7', sales: 497 },
		{ item: '商品8', sales: 381 },
		{ item: '商品9', sales: 167 },
		{ item: '商品10', sales: 613 }
	],
	[
		{ item: '商品1', sales: 497 },
		{ item: '商品2', sales: 346 },
		{ item: '商品3', sales: 327 },
		{ item: '商品4', sales: 492 },
		{ item: '商品5', sales: 197 },
		{ item: '商品6', sales: 237 },
		{ item: '商品7', sales: 513 },
		{ item: '商品8', sales: 470 },
		{ item: '商品9', sales: 190 },
		{ item: '商品10', sales: 572 }
	],
	[
		{ item: '商品1', sales: 502 },
		{ item: '商品2', sales: 310 },
		{ item: '商品3', sales: 382 },
		{ item: '商品4', sales: 442 },
		{ item: '商品5', sales: 260 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 553 },
		{ item: '商品8', sales: 472 },
		{ item: '商品9', sales: 230 },
		{ item: '商品10', sales: 501 }
	],
	[
		{ item: '商品1', sales: 510 },
		{ item: '商品2', sales: 320 },
		{ item: '商品3', sales: 332 },
		{ item: '商品4', sales: 412 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 247 },
		{ item: '商品7', sales: 573 },
		{ item: '商品8', sales: 482 },
		{ item: '商品9', sales: 235 },
		{ item: '商品10', sales: 507 }
	],
	[
		{ item: '商品1', sales: 208 },
		{ item: '商品2', sales: 351 },
		{ item: '商品3', sales: 167 },
		{ item: '商品4', sales: 613 },
		{ item: '商品5', sales: 452 },
		{ item: '商品6', sales: 395 },
		{ item: '商品7', sales: 167 },
		{ item: '商品8', sales: 351 },
		{ item: '商品9', sales: 246 },
		{ item: '商品10', sales: 198 }
	],
	[
		{ item: '商品1', sales: 167 },
		{ item: '商品2', sales: 431 },
		{ item: '商品3', sales: 137 },
		{ item: '商品4', sales: 498 },
		{ item: '商品5', sales: 276 },
		{ item: '商品6', sales: 125 },
		{ item: '商品7', sales: 672 },
		{ item: '商品8', sales: 392 },
		{ item: '商品9', sales: 218 },
		{ item: '商品10', sales: 172 }
	],
	[
		{ item: '商品1', sales: 513 },
		{ item: '商品2', sales: 431 },
		{ item: '商品3', sales: 287 },
		{ item: '商品4', sales: 512 },
		{ item: '商品5', sales: 345 },
		{ item: '商品6', sales: 89 },
		{ item: '商品7', sales: 447 },
		{ item: '商品8', sales: 381 },
		{ item: '商品9', sales: 167 },
		{ item: '商品10', sales: 497 }
	],
	[
		{ item: '商品1', sales: 497 },
		{ item: '商品2', sales: 346 },
		{ item: '商品3', sales: 327 },
		{ item: '商品4', sales: 492 },
		{ item: '商品5', sales: 197 },
		{ item: '商品6', sales: 237 },
		{ item: '商品7', sales: 513 },
		{ item: '商品8', sales: 470 },
		{ item: '商品9', sales: 170 },
		{ item: '商品10', sales: 572 }
	],
	[
		{ item: '商品1', sales: 502 },
		{ item: '商品2', sales: 310 },
		{ item: '商品3', sales: 382 },
		{ item: '商品4', sales: 442 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 553 },
		{ item: '商品8', sales: 472 },
		{ item: '商品9', sales: 230 },
		{ item: '商品10', sales: 501 }
	],
	[
		{ item: '商品1', sales: 510 },
		{ item: '商品2', sales: 340 },
		{ item: '商品3', sales: 332 },
		{ item: '商品4', sales: 412 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 563 },
		{ item: '商品8', sales: 482 },
		{ item: '商品9', sales: 235 },
		{ item: '商品10', sales: 507 }
	],
	[
		{ item: '商品1', sales: 510 },
		{ item: '商品2', sales: 320 },
		{ item: '商品3', sales: 332 },
		{ item: '商品4', sales: 412 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 247 },
		{ item: '商品7', sales: 573 },
		{ item: '商品8', sales: 482 },
		{ item: '商品9', sales: 235 },
		{ item: '商品10', sales: 707 }
	],
	[
		{ item: '商品1', sales: 502 },
		{ item: '商品2', sales: 310 },
		{ item: '商品3', sales: 382 },
		{ item: '商品4', sales: 442 },
		{ item: '商品5', sales: 270 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 553 },
		{ item: '商品8', sales: 472 },
		{ item: '商品9', sales: 230 },
		{ item: '商品10', sales: 301 }
	],
	[
		{ item: '商品1', sales: 517 },
		{ item: '商品2', sales: 340 },
		{ item: '商品3', sales: 332 },
		{ item: '商品4', sales: 412 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 403 },
		{ item: '商品8', sales: 482 },
		{ item: '商品9', sales: 235 },
		{ item: '商品10', sales: 407 }
	],
	[
		{ item: '商品1', sales: 502 },
		{ item: '商品2', sales: 310 },
		{ item: '商品3', sales: 582 },
		{ item: '商品4', sales: 442 },
		{ item: '商品5', sales: 430 },
		{ item: '商品6', sales: 217 },
		{ item: '商品7', sales: 453 },
		{ item: '商品8', sales: 472 },
		{ item: '商品9', sales: 230 },
		{ item: '商品10', sales: 406 }
	],
	[
		{ item: '商品1', sales: 510 },
		{ item: '商品2', sales: 320 },
		{ item: '商品3', sales: 172 },
		{ item: '商品4', sales: 452 },
		{ item: '商品5', sales: 230 },
		{ item: '商品6', sales: 247 },
		{ item: '商品7', sales: 573 },
		{ item: '商品8', sales: 482 },
		{ item: '商品9', sales: 235 },
		{ item: '商品10', sales: 507 }
	],
	[
		{ item: '商品1', sales: 208 },
		{ item: '商品2', sales: 351 },
		{ item: '商品3', sales: 167 },
		{ item: '商品4', sales: 613 },
		{ item: '商品5', sales: 452 },
		{ item: '商品6', sales: 870 },
		{ item: '商品7', sales: 167 },
		{ item: '商品8', sales: 351 },
		{ item: '商品9', sales: 246 },
		{ item: '商品10', sales: 198 }
	],
]

const columns = [
	{
		title: '排名',
		dataIndex: 'sort',
		width: 150,
		render: sort => 'No.' + (sort + 1),
	},
	{
		title: '商品名称',
		dataIndex: 'item',
	},
	{
		title: '销量（万元）',
		dataIndex: 'sales',
	},
];

export default class LeftNav extends Component {
	state = {
		chartData: [],
		tableData: []
	}

	//冒泡排序：模拟数据降序排列
	bubbleSort = array => {
		const arr = [...array]
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {
				if (arr[j].sales < arr[j + 1].sales) {
					let temp = arr[j]
					arr[j] = arr[j + 1]
					arr[j + 1] = temp
				}
			}
		}
		return arr
	}

	//添加排名（索引）
	addSort = arr => {
		for (let i = 0; i < arr.length; i++) {
			arr[i] = { ...arr[i], sort: i }
		}
		return arr
	}

	componentDidMount() {
		this.setState({
			chartData: salesArr[0],
			tableData: this.addSort(this.bubbleSort(salesArr[0]))
		})
	}

	render() {
		const { tableData, chartData } = this.state
		return (
			<div className='bar-chart-wrapper'>
				<Header className='bar-chart-header'>
					<Menu
						mode="horizontal"
						defaultSelectedKeys={['0']}
						className='bar-chart-menu'
						onSelect={item => {
							this.setState({
								chartData: salesArr[item.key],
								tableData: this.addSort(this.bubbleSort(salesArr[item.key]))
							})
						}}
					>
						{dateArr.map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>)}
					</Menu>
				</Header>
				<Table
					className='bar-chart-table'
					rowKey='item'
					pagination={{
						pageSize: 5
					}}
					columns={columns}
					dataSource={tableData}
				/>
				<Chart
					className='bar-chart-chart'
					height={300}
					autoFit
					data={chartData}
				>
					<Interval
						position="item*sales"
						color="item"
					/>
					<Tooltip shared />
				</Chart>
			</div >
		)
	}
}
