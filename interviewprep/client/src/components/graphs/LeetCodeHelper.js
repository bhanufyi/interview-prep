import {
	Box,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BlackBackgroundPattern from "../../img/y-so-serious.png";

const useStyles = makeStyles((theme) => ({
	Card: {
		minHeight: "150px",
		minWidth: "150px",
		display: "flex",
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	ContainerTop: {
		marginTop: "20px",
	},

	circularProgress: {
		display: "block",
		position: "absolute",
		margin: "10px auto",
		width: "108px",
		height: "108px",
	},

	circle: {
		stroke: "#4CC790",
		fill: "none",
		strokeWidth: "2.8",
		strokeLinecap: "round",
		animation: `$progress 1s ease-out forwards`,
	},

	percentage: {
		fontSize: "27px",
		fontWeight: "500",
		lineHeight: "13.5px",
		textAlign: "center",
	},

	radius: {
		height: "100px",
		width: "100px",
		position: "absolute",
		border: "3px solid rgb(224,224,224)",
		borderRadius: "50%",
		background: "white",
	},

	"@keyframes progress": {
		"0%": {
			strokeDasharray: "0 100",
		},
	},
}));

const LeetCodeHelper = (props) => {
	const { data } = props.leetcode;
	const classes = useStyles();

	const CircularProgressIndicator = ({
		title,
		strokeColor,
		solved,
		total,
		acceptance,
	}) => (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			<Paper className={classes.Card} elevation={0}>
				<div className={classes.radius}></div>
				<svg viewBox="0 0 36 36" className={classes.circularProgress}>
					<path
						className={classes.circle}
						style={{ stroke: `${strokeColor}` }}
						strokeDasharray={`${acceptance}, 100`}
						d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
				</svg>
				<Box
					position="absolute"
					display="flex"
					flexDirection="column"
					alignItems="center"
				>
					<div>
						<span className={classes.percentage}>
							{acceptance.split(".").length > 1
								? acceptance.split(".")[0]
								: acceptance.split("%")[0]}
						</span>
						<span>.</span>
						<span
							className={classes.percentage}
							style={{ fontSize: "13.5px" }}
						>
							{acceptance.split(".").length > 1
								? acceptance.split(".")[1]
								: "0%"}
						</span>
					</div>
					<div
						style={{
							fontSize: "13.5px",
							fontWeight: "normal",
							color: "rgb(158,158,158)",
						}}
					>
						Acceptance
					</div>
				</Box>
			</Paper>
			<Box display="flex" flexDirection="column" alignItems="center">
				<div
					style={{
						color: strokeColor,
						textTransform: "capitalize",
						fontSize: "13.5px",
						fontWeight: "normal",
					}}
				>
					{title}
				</div>
				<div>
					<span>{solved}</span>
					<span
						style={{
							fontSize: "13.5px",
							fontWeight: "normal",
							color: "rgb(158,158,158)",
						}}
					>
						/{total}
					</span>
				</div>
			</Box>
		</Box>
	);
	return (
		<Container maxWidth={"md"}>
			<Grid container={true} spacing={2}>
				<Grid item xs={12}>
					<Paper>
						<Grid
							container
							direction="column"
							className={classes.Card}
							alignItems="center"
							style={{
								background: `url(${BlackBackgroundPattern})`,
								color: "white",
								textAlign: "center",
							}}
						>
							<Grid item style={{ paddingLeft: "5px" }}>
								<h2>Leetcode Stats</h2>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={4} justifyContent="center">
						<Grid item>
							<Paper elevation={2}>
								<CircularProgressIndicator
									title="overall"
									strokeColor="#000"
									solved={data.total_problems_solved}
									total={
										parseInt(data.total_easy_questions) +
										parseInt(data.total_medium_questions) +
										parseInt(data.total_hard_questions)
									}
									acceptance={data.acceptance_rate}
								/>
							</Paper>
						</Grid>
						<Grid item>
							<Paper elevation={2}>
								<CircularProgressIndicator
									title="easy"
									strokeColor="#43a047"
									solved={data.easy_questions_solved}
									total={data.total_easy_questions}
									acceptance={data.easy_acceptance_rate}
								/>
							</Paper>
						</Grid>
						<Grid item>
							<Paper elevation={2}>
								<CircularProgressIndicator
									title="medium"
									strokeColor="#fb8a00"
									solved={data.medium_questions_solved}
									total={data.total_medium_questions}
									acceptance={data.medium_acceptance_rate}
								/>
							</Paper>
						</Grid>
						<Grid item>
							<Paper elevation={2}>
								<CircularProgressIndicator
									title="hard"
									strokeColor="#e91e63"
									solved={data.hard_questions_solved}
									total={data.total_hard_questions}
									acceptance={data.hard_acceptance_rate}
								/>
							</Paper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Grid container justifyContent="space-between" spacing={2}>
						<Grid item xs={12}>
							<Paper>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
								>
									<div>contributions</div>
									<Divider
										orientation="horizontal"
										variant="fullWidth"
									/>

									<div>
										points <span>104</span>
									</div>
									<Divider
										orientation="horizontal"
										variant="fullWidth"
									/>
									<div>
										problems <span>104</span>
									</div>
									<Divider
										orientation="horizontal"
										variant="fullWidth"
									/>
									<div>
										testcases<span>104</span>
									</div>
								</Box>
							</Paper>
						</Grid>
						{/* <Grid item xs={12}>
							<Paper>hello </Paper>
						</Grid> */}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default LeetCodeHelper;
