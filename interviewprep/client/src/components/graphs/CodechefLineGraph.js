import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const CodechefLineGraph = ({data,xdatakey,ydatakey,stroke}) => {
	return (
		<ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
			<LineChart data={data}>
				<XAxis dataKey={xdatakey} interval="preserveStart" />
				<Line
					activeDot={true}
					type="monotone"
					dataKey={ydatakey}
					stroke={stroke}
					strokeWidth={2}
				/>
				<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />c
				<Tooltip />
				<Legend />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default CodechefLineGraph;
