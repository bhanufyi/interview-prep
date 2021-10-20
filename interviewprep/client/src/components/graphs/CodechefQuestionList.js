import { Paper,Box,Divider } from '@material-ui/core';
import React from 'react'

const CodechefQuestionList = ({ solved, graphHolder,divider }) => {
	console.log(solved);
	return (
		<Paper className={graphHolder}>
			<h3> Practice </h3>
			<Divider
				className={divider}
				orientation="horizontal"
				variant="fullWidth"
				flexItem
			/>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="start"
				flexWrap="wrap"
			>
				{solved["Practice"].map((item) => (
					<div style={{ margin: "5px" }}>
						<a
							href={item.link}
							target="_blank"
							rel="noreferrer noopener"
						>
							{item.name}
						</a>
					</div>
				))}
			</Box>
			<h4 style={{marginTop:"10px"}}> Contests </h4>
			<Divider
				className={divider}
				orientation="horizontal"
				variant="fullWidth"
				flexItem
			/>
			<Box display="flex" flexDirection="column">
				{Object.keys(solved)
					.filter((item) => item !== "Practice" && item !== "count")
					.map((itemkey) => {
						return (
							<Box display="flex" flexDirection="column">
								<h3>{itemkey}</h3>
								<Box
									display="flex"
									flexDirection="row"
									alignItems="start"
									flexWrap="wrap"
								>
									{solved[itemkey].map((item) => (
										<div
											style={{
												margin: "5px",
											}}
										>
											<a
												href={item.link}
												target="_blank"
												rel="noreferrer noopener"
											>
												{item.name}
											</a>
										</div>
									))}
								</Box>
							</Box>
						);
					})}
			</Box>
		</Paper>
	);
}

export default CodechefQuestionList
