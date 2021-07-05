import React from "react";
import {
	G2,
	Chart,
	Tooltip,
	Interval,
	Interaction
} from "bizcharts";

const data = [
	{ name: '服装服饰', month: 'Jan.', avgRevenue: 18.9 },
	{ name: '服装服饰', month: 'Feb.', avgRevenue: 28.8 },
	{ name: '服装服饰', month: 'Mar.', avgRevenue: 39.3 },
	{ name: '服装服饰', month: 'Apr.', avgRevenue: 20.4 },
	{ name: '服装服饰', month: 'May', avgRevenue: 47 },
	{ name: '服装服饰', month: 'Jun.', avgRevenue: 20.3 },
	{ name: '服装服饰', month: 'Jul.', avgRevenue: 24 },
	{ name: '服装服饰', month: 'Aug.', avgRevenue: null },
	{ name: '电子产品', month: 'Jan.', avgRevenue: 19.9 },
	{ name: '电子产品', month: 'Feb.', avgRevenue: 28.8 },
	{ name: '电子产品', month: 'Mar.', avgRevenue: 29.3 },
	{ name: '电子产品', month: 'Apr.', avgRevenue: null },
	{ name: '电子产品', month: 'May', avgRevenue: 52 },
	{ name: '电子产品', month: 'Jun.', avgRevenue: null },
	{ name: '电子产品', month: 'Jul.', avgRevenue: 23 },
	{ name: '电子产品', month: 'Aug.', avgRevenue: null },
	{ name: '母婴用品', month: 'Jan.', avgRevenue: 12.4 },
	{ name: '母婴用品', month: 'Feb.', avgRevenue: 23.2 },
	{ name: '母婴用品', month: 'Mar.', avgRevenue: 34.5 },
	{ name: '母婴用品', month: 'Apr.', avgRevenue: null },
	{ name: '母婴用品', month: 'May', avgRevenue: 52.6 },
	{ name: '母婴用品', month: 'Jun.', avgRevenue: 35.5 },
	{ name: '母婴用品', month: 'Jul.', avgRevenue: 37.4 },
	{ name: '母婴用品', month: 'Aug.', avgRevenue: 42.4 },
];

const scale = {
	month: {
		alias: '月份'
	},
	avgRevenue: {
		alias: '月均营业额'
	}
}

export default function bar() {
	return (
		<Chart height={400} padding="auto" data={data} autoFit filter={[
			['avgRainfall', val => val != null] // 图表将会只渲染过滤后的数据
		]}>
			<Interval
				adjust={[
					{
						type: 'dodge',
						marginRatio: 0,
					},
				]}
				color="name"
				position="month*avgRevenue"
			/>
			<Tooltip shared />
			<Interaction type="active-region" />
		</Chart>
	);
}
