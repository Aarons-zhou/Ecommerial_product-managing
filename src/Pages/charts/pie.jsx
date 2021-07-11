//上半年 种类
import React from "react";
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	getTheme,
} from "bizcharts";

export default function Labelline() {
	const data = [
		{ item: "事例一", percent: 0.4 },
		{ item: "事例二", percent: 0.21 },
		{ item: "事例三", percent: 0.17 },
		{ item: "事例四", percent: 0.13 },
		{ item: "事例五", percent: 0.09 },
	];
	const colors = data.reduce((pre, cur, idx) => {
		pre[cur.item] = getTheme().colors10[idx];
		return pre;
	}, {});

	const cols = {
		percent: {
			formatter: (val) => {
				val = val * 100 + "%";
				return val;
			},
		},
	};

	return (
		<Chart height={400} data={data} scale={cols} interactions={['element-active']} autoFit>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
				color="item"
				style={{
					lineWidth: 1,
					stroke: "#fff",
				}}
				label={[
					"item",
					(item) => {
						return {
							offset: 20,
							content: (data) => {
								return `${data.item}\n ${data.percent * 100}%`;
							},
							style: {
								fill: colors[item],
							},
						};
					},
				]}
			/>
		</Chart>
	);
}