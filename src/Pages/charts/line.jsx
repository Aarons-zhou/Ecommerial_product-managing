/*
    按城市分类，做每个城市实体店的销售总额
*/
import React, { Component } from 'react';
import { Menu, Layout } from 'antd'
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

const { Header } = Layout

//模拟日期数据，请忽略
const dateArr = [2020, 2019, 2018, 2017, 2016]

//模拟销售数据，请忽略
const salesArr = [
	[
		{ month: "Jan", city: "shenzhen", temperature: 7.0 },
		{ month: "Jan", city: "guangzhou", temperature: 5.0 },
		{ month: "Jan", city: "foshan", temperature: 3.9 },
		{ month: "Feb", city: "shenzhen", temperature: 6.9 },
		{ month: "Feb", city: "guangzhou", temperature: 5.1 },
		{ month: "Feb", city: "foshan", temperature: 4.2 },
		{ month: "Mar", city: "shenzhen", temperature: 9.5 },
		{ month: "Mar", city: "guangzhou", temperature: 7.8 },
		{ month: "Mar", city: "foshan", temperature: 5.7 },
		{ month: "Apr", city: "shenzhen", temperature: 14.5 },
		{ month: "Apr", city: "guangzhou", temperature: 11.9 },
		{ month: "Apr", city: "foshan", temperature: 8.5 },
		{ month: "May", city: "shenzhen", temperature: 18.4 },
		{ month: "May", city: "guangzhou", temperature: 15.2 },
		{ month: "May", city: "foshan", temperature: 11.9 },
		{ month: "Jun", city: "shenzhen", temperature: 21.5 },
		{ month: "Jun", city: "guangzhou", temperature: 18.8 },
		{ month: "Jun", city: "foshan", temperature: 15.2 },
		{ month: "Jul", city: "shenzhen", temperature: 25.2 },
		{ month: "Jul", city: "guangzhou", temperature: 22.4 },
		{ month: "Jul", city: "foshan", temperature: 17 },
		{ month: "Aug", city: "shenzhen", temperature: 26.5 },
		{ month: "Aug", city: "guangzhou", temperature: 24.6 },
		{ month: "Aug", city: "foshan", temperature: 16.6 },
		{ month: "Sep", city: "shenzhen", temperature: 23.3 },
		{ month: "Sep", city: "guangzhou", temperature: 21.2 },
		{ month: "Sep", city: "foshan", temperature: 14.2 },
		{ month: "Oct", city: "shenzhen", temperature: 18.3 },
		{ month: "Oct", city: "guangzhou", temperature: 16.7 },
		{ month: "Oct", city: "foshan", temperature: 10.3 },
		{ month: "Nov", city: "shenzhen", temperature: 13.9 },
		{ month: "Nov", city: "guangzhou", temperature: 11.4 },
		{ month: "Nov", city: "foshan", temperature: 6.6 },
		{ month: "Dec", city: "shenzhen", temperature: 9.6 },
		{ month: "Dec", city: "guangzhou", temperature: 8.0 },
		{ month: "Dec", city: "foshan", temperature: 4.8 }
	],
	[
		{ month: "Jan", city: "shenzhen", temperature: 8.0 },
		{ month: "Jan", city: "guangzhou", temperature: 6.0 },
		{ month: "Jan", city: "foshan", temperature: 5.1 },
		{ month: "Feb", city: "shenzhen", temperature: 7.9 },
		{ month: "Feb", city: "guangzhou", temperature: 6.1 },
		{ month: "Feb", city: "foshan", temperature: 5.3 },
		{ month: "Mar", city: "shenzhen", temperature: 10.5 },
		{ month: "Mar", city: "guangzhou", temperature: 8.8 },
		{ month: "Mar", city: "foshan", temperature: 6.9 },
		{ month: "Apr", city: "shenzhen", temperature: 15.5 },
		{ month: "Apr", city: "guangzhou", temperature: 12.9 },
		{ month: "Apr", city: "foshan", temperature: 9.8 },
		{ month: "May", city: "shenzhen", temperature: 19.4 },
		{ month: "May", city: "guangzhou", temperature: 16.2 },
		{ month: "May", city: "foshan", temperature: 13.5 },
		{ month: "Jun", city: "shenzhen", temperature: 22.5 },
		{ month: "Jun", city: "guangzhou", temperature: 19.8 },
		{ month: "Jun", city: "foshan", temperature: 16.2 },
		{ month: "Jul", city: "shenzhen", temperature: 26.2 },
		{ month: "Jul", city: "guangzhou", temperature: 22.0 },
		{ month: "Jul", city: "foshan", temperature: 18.0 },
		{ month: "Aug", city: "shenzhen", temperature: 27.5 },
		{ month: "Aug", city: "guangzhou", temperature: 24.1 },
		{ month: "Aug", city: "foshan", temperature: 17.6 },
		{ month: "Sep", city: "shenzhen", temperature: 24.3 },
		{ month: "Sep", city: "guangzhou", temperature: 20.2 },
		{ month: "Sep", city: "foshan", temperature: 15.2 },
		{ month: "Oct", city: "shenzhen", temperature: 19.3 },
		{ month: "Oct", city: "guangzhou", temperature: 15.7 },
		{ month: "Oct", city: "foshan", temperature: 11.3 },
		{ month: "Nov", city: "shenzhen", temperature: 14.9 },
		{ month: "Nov", city: "guangzhou", temperature: 12.4 },
		{ month: "Nov", city: "foshan", temperature: 7.6 },
		{ month: "Dec", city: "shenzhen", temperature: 10.6 },
		{ month: "Dec", city: "guangzhou", temperature: 9.0 },
		{ month: "Dec", city: "foshan", temperature: 5.5 }
	],
	[
		{ month: "Jan", city: "shenzhen", temperature: 7.5 },
		{ month: "Jan", city: "guangzhou", temperature: 6.0 },
		{ month: "Jan", city: "foshan", temperature: 4.1 },
		{ month: "Feb", city: "shenzhen", temperature: 7.0 },
		{ month: "Feb", city: "guangzhou", temperature: 8.0 },
		{ month: "Feb", city: "foshan", temperature: 5.3 },
		{ month: "Mar", city: "shenzhen", temperature: 8.5 },
		{ month: "Mar", city: "guangzhou", temperature: 9.8 },
		{ month: "Mar", city: "foshan", temperature: 6.9 },
		{ month: "Apr", city: "shenzhen", temperature: 13.5 },
		{ month: "Apr", city: "guangzhou", temperature: 12.0 },
		{ month: "Apr", city: "foshan", temperature: 9.8 },
		{ month: "May", city: "shenzhen", temperature: 16.4 },
		{ month: "May", city: "guangzhou", temperature: 14.2 },
		{ month: "May", city: "foshan", temperature: 13.5 },
		{ month: "Jun", city: "shenzhen", temperature: 19.5 },
		{ month: "Jun", city: "guangzhou", temperature: 17.8 },
		{ month: "Jun", city: "foshan", temperature: 16.2 },
		{ month: "Jul", city: "shenzhen", temperature: 22.2 },
		{ month: "Jul", city: "guangzhou", temperature: 20.0 },
		{ month: "Jul", city: "foshan", temperature: 18.0 },
		{ month: "Aug", city: "shenzhen", temperature: 24.5 },
		{ month: "Aug", city: "guangzhou", temperature: 22.1 },
		{ month: "Aug", city: "foshan", temperature: 17.6 },
		{ month: "Sep", city: "shenzhen", temperature: 22.3 },
		{ month: "Sep", city: "guangzhou", temperature: 20.2 },
		{ month: "Sep", city: "foshan", temperature: 15.2 },
		{ month: "Oct", city: "shenzhen", temperature: 19.3 },
		{ month: "Oct", city: "guangzhou", temperature: 16.7 },
		{ month: "Oct", city: "foshan", temperature: 11.3 },
		{ month: "Nov", city: "shenzhen", temperature: 14.9 },
		{ month: "Nov", city: "guangzhou", temperature: 12.4 },
		{ month: "Nov", city: "foshan", temperature: 7.6 },
		{ month: "Dec", city: "shenzhen", temperature: 10.6 },
		{ month: "Dec", city: "guangzhou", temperature: 9.0 },
		{ month: "Dec", city: "foshan", temperature: 5.5 }
	],
	[
		{ month: "Jan", city: "shenzhen", temperature: 8.5 },
		{ month: "Jan", city: "guangzhou", temperature: 6.5 },
		{ month: "Jan", city: "foshan", temperature: 4.6 },
		{ month: "Feb", city: "shenzhen", temperature: 8.9 },
		{ month: "Feb", city: "guangzhou", temperature: 7.1 },
		{ month: "Feb", city: "foshan", temperature: 5.0 },
		{ month: "Mar", city: "shenzhen", temperature: 11.0 },
		{ month: "Mar", city: "guangzhou", temperature: 9.8 },
		{ month: "Mar", city: "foshan", temperature: 6.2 },
		{ month: "Apr", city: "shenzhen", temperature: 16.5 },
		{ month: "Apr", city: "guangzhou", temperature: 13.9 },
		{ month: "Apr", city: "foshan", temperature: 9.1 },
		{ month: "May", city: "shenzhen", temperature: 19.9 },
		{ month: "May", city: "guangzhou", temperature: 16.8 },
		{ month: "May", city: "foshan", temperature: 12.5 },
		{ month: "Jun", city: "shenzhen", temperature: 23.5 },
		{ month: "Jun", city: "guangzhou", temperature: 20.8 },
		{ month: "Jun", city: "foshan", temperature: 15.2 },
		{ month: "Jul", city: "shenzhen", temperature: 25.2 },
		{ month: "Jul", city: "guangzhou", temperature: 22.7 },
		{ month: "Jul", city: "foshan", temperature: 18.4 },
		{ month: "Aug", city: "shenzhen", temperature: 28.5 },
		{ month: "Aug", city: "guangzhou", temperature: 25.1 },
		{ month: "Aug", city: "foshan", temperature: 16.6 },
		{ month: "Sep", city: "shenzhen", temperature: 24.8 },
		{ month: "Sep", city: "guangzhou", temperature: 21.2 },
		{ month: "Sep", city: "foshan", temperature: 14.2 },
		{ month: "Oct", city: "shenzhen", temperature: 19.8 },
		{ month: "Oct", city: "guangzhou", temperature: 16.7 },
		{ month: "Oct", city: "foshan", temperature: 10.3 },
		{ month: "Nov", city: "shenzhen", temperature: 15.9 },
		{ month: "Nov", city: "guangzhou", temperature: 13.4 },
		{ month: "Nov", city: "foshan", temperature: 7.4 },
		{ month: "Dec", city: "shenzhen", temperature: 10.4 },
		{ month: "Dec", city: "guangzhou", temperature: 8.0 },
		{ month: "Dec", city: "foshan", temperature: 5.5 }
	],
	[
		{ month: "Jan", city: "shenzhen", temperature: 7.5 },
		{ month: "Jan", city: "guangzhou", temperature: 5.5 },
		{ month: "Jan", city: "foshan", temperature: 4.9 },
		{ month: "Feb", city: "shenzhen", temperature: 6.8 },
		{ month: "Feb", city: "guangzhou", temperature: 5.8 },
		{ month: "Feb", city: "foshan", temperature: 4.5 },
		{ month: "Mar", city: "shenzhen", temperature: 9.4 },
		{ month: "Mar", city: "guangzhou", temperature: 7.2 },
		{ month: "Mar", city: "foshan", temperature: 5.1 },
		{ month: "Apr", city: "shenzhen", temperature: 13.7 },
		{ month: "Apr", city: "guangzhou", temperature: 12.9 },
		{ month: "Apr", city: "foshan", temperature: 8.8 },
		{ month: "May", city: "shenzhen", temperature: 17.4 },
		{ month: "May", city: "guangzhou", temperature: 16.2 },
		{ month: "May", city: "foshan", temperature: 10.9 },
		{ month: "Jun", city: "shenzhen", temperature: 22.5 },
		{ month: "Jun", city: "guangzhou", temperature: 19.8 },
		{ month: "Jun", city: "foshan", temperature: 14.2 },
		{ month: "Jul", city: "shenzhen", temperature: 24.2 },
		{ month: "Jul", city: "guangzhou", temperature: 22.4 },
		{ month: "Jul", city: "foshan", temperature: 17.5 },
		{ month: "Aug", city: "shenzhen", temperature: 26.2 },
		{ month: "Aug", city: "guangzhou", temperature: 23.6 },
		{ month: "Aug", city: "foshan", temperature: 17.6 },
		{ month: "Sep", city: "shenzhen", temperature: 22.3 },
		{ month: "Sep", city: "guangzhou", temperature: 20.2 },
		{ month: "Sep", city: "foshan", temperature: 15.2 },
		{ month: "Oct", city: "shenzhen", temperature: 18.7 },
		{ month: "Oct", city: "guangzhou", temperature: 16.2 },
		{ month: "Oct", city: "foshan", temperature: 10.3 },
		{ month: "Nov", city: "shenzhen", temperature: 13.2 },
		{ month: "Nov", city: "guangzhou", temperature: 11.7 },
		{ month: "Nov", city: "foshan", temperature: 6.6 },
		{ month: "Dec", city: "shenzhen", temperature: 9.6 },
		{ month: "Dec", city: "guangzhou", temperature: 8.0 },
		{ month: "Dec", city: "foshan", temperature: 4.8 }
	]
]

const scale = {
	temperature: { min: 0 },
	city: {
		formatter: v => {
			return {
				shenzhen: '深圳',
				guangzhou:'广州',
				foshan: '佛山'
			}[v]
		}
	}
}

export default class ChartLine extends Component {

	state = {
		chartData: [],
	}

	componentDidMount() {
		this.setState({
			chartData: salesArr[0],
		})
	}

	render() {
		const { chartData } = this.state
		return (
			<div className='line-chart-wrapper'>
				<Header className='line-chart-header'>
					<Menu
						mode="horizontal"
						defaultSelectedKeys={['0']}
						className='line-chart-menu'
						onSelect={item => {
							this.setState({
								chartData: salesArr[item.key]
							})
						}}
					>
						{dateArr.map((year, index) => <Menu.Item key={index}>{year}</Menu.Item>)}
					</Menu>
				</Header>
				<Chart
					scale={scale}
					padding={[30, 20, 60, 40]}
					autoFit
					height={500}
					data={chartData}
					interactions={['element-active']}
				>
					<Point position="month*temperature" color="city" shape='circle' />
					<Line shape="smooth" position="month*temperature" color="city" label="temperature" />
					<Tooltip shared showCrosshairs />
					<Legend background={{
						padding: [5, 168, 5, 36],
						style: {
							fill: '#eaeaea',
							stroke: '#fff'
						}
					}} />
				</Chart>
			</div>
		)
	}
}
