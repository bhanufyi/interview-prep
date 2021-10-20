import React from 'react';
import { AppBar, Tabs, Tab,Box } from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CodechefLineGraph from './CodechefLineGraph';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3} justifyContent="center">
					{children}
				</Box>
			)}
		</div>
	);
}


function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
	};
}


const CodechefContestGraph = ({ data: { contest_ratings } }) => {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};
	return (
		<div>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab label="Rating" {...a11yProps(0)} />
					<Tab label="Ranking" {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<CodechefLineGraph
						data={contest_ratings}
						xdatakey="getyear"
						ydatakey="rating"
						stroke="#8884d8"
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<CodechefLineGraph
						data={contest_ratings}
						xdatakey="getyear"
						ydatakey="rank"
						stroke="#FFA500"
					/>
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}

export default CodechefContestGraph
