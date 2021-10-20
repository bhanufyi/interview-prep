import React  from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";

variablePie(Highcharts);

const PieGraph = ({data: {fully_solved, partially_solved}}) => {

	const pieOptions = {
		credits: false,
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: "pie",
		},
		title: {
			text: "Submissions",
		},
		tooltip: {
			pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
		},
		accessibility: {
			point: {
				valueSuffix: "%",
			},
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: "pointer",
				dataLabels: {
					enabled: true,
					format: "{point.y}",
				},
				showInLegend: true,
			},
		},
		series: [
			{
				name: "Submissions",
				colorByPoint: true,
				data: [
					{
						name: "fully_solved",
						y: fully_solved.count,
						sliced: true,
						selected: true,
					},
					{
						name: "partially_solved",
						y: partially_solved.count,
						sliced: true,
					},
				],
			},
		],
	};
		return (
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={pieOptions}
				/>
			</div>
		);
	
}

export default PieGraph;
