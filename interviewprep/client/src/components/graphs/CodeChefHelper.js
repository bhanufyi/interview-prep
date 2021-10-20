import React from "react";
import { Box, Container, Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PieGraph from "./PieGraph";
import CodechefContestGraph from "./CodechefContestGraph";
import CodechefQuestionList from "./CodechefQuestionList";
import BlackBackgroundPattern from '../../img/y-so-serious.png';
import BlueBackgroundPattern from '../../img/vintage-wallpaper.png';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	scoreCards: {
		padding: theme.spacing(2),
		display: "flex",
		margin: "20px",
		flexDirection: "column",
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		width: "200px",
		flexDirection: "column",
	},
	divider: {
		margin: "5px",
		borderTop: "3px solid orange",
		bordeRadius: "1px",
	},

	graphHolder: {
		padding: theme.spacing(2),
		width: "100%",
		height: "100%",
	},

	questionListPaper: {
		padding: theme.spacing(2),
	},

	container: {
		marginBottom: "10px",
		backgroundColor: "black",
	},

	topcard: {
		background: `url(${BlackBackgroundPattern})`,
		borderRadius: '5px',
	}
}));

const CodeChefHelper = (props) => {
	const { data } = props.codechef;
	const { fully_solved, partially_solved } = data;
	const pieData = { fully_solved, partially_solved };
	const classes = useStyles();

	return (
		<Container className={classes.root} maxWidth="md">
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid
						container
						justifyContent="center"
						spacing={2}
						className={classes.topcard}
						style={{ background: `url(${BlueBackgroundPattern})` }}
					>
						<Grid item>
							<Paper className={classes.scoreCards} elevation={3}>
								<Box flexDirection="column">
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
										justifyContent="center"
									>
										<h3 style={{ fontWeight: "bolder" }}>
											{data.rating}
										</h3>
										<div>
											<span>rating</span>
										</div>
									</Box>
									<div>stars: {data.stars}</div>
									<div>
										Highest Rating: {data.highest_rating}
									</div>

									<Divider
										className={classes.divider}
										orientation="horizontal"
										variant="fullWidth"
										flexItem
									/>

									<Box
										display="flex"
										flexDirection="row"
										justifyContent="space-between"
									>
										<Box
											display="flex"
											flexDirection="column"
											justifyContent="center"
										>
											<h3> {data.global_rank}</h3>
											<div>
												<span>global ranking</span>
											</div>
										</Box>
										<Divider
											className={classes.divider}
											orientation="vertical"
											flexItem
										/>
										<Box
											display="flex"
											flexDirection="column"
											justifyContent="center"
										>
											<h3> {data.country_rank}</h3>
											<div>
												<span>country ranking</span>
											</div>
										</Box>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Grid
						container
						justifyContent="center"
						spacing={2}
						className={classes.topcard}
					>
						{data.contests.map((contest) => (
							<Grid item>
								<Paper
									className={classes.paper}
									key={contest.name}
								>
									<p>
										<span>Contest:</span>{" "}
										<span> {contest.name} </span>
									</p>
									<p>
										<span>Rating:</span>{" "}
										<span>{contest.rating} </span>
									</p>
									<p>
										<span>Global Rank:</span>
										<span> {contest.global_rank}</span>
									</p>
									<p>
										<span>Country Rank:</span>
										<span> {contest.country_rank} </span>
									</p>
								</Paper>
								<Divider orientation="vertical" flexItem />
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="space-around">
						<Grid item xs={12}>
							<Paper className={classes.graphHolder}>
								<Box>
									<CodechefContestGraph data={data} />
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Grid container justifyContent="space-around">
						<Grid item xs={12}>
							<Paper className={classes.graphHolder}>
								<Box>
									<PieGraph data={pieData} />
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Grid container justifyContent="space-around" spacing={2}>
						<Grid item md={6} xs={12}>
							<Box display="flex" flexDirection="column">
								<h2 style={{ textAlign: "center" }}>
									Fully Solved
								</h2>
								<CodechefQuestionList
									solved={data.fully_solved}
									graphHolder={classes.questionListPaper}
									divider={classes.divider}
								/>
							</Box>
						</Grid>
						<Grid item md={6} xs={12}>
							<Box display="flex" flexDirection="column">
								<h2 style={{ textAlign: "center" }}>
									Partially Solved
								</h2>
								<CodechefQuestionList
									solved={data.partially_solved}
									graphHolder={classes.questionListPaper}
									divider={classes.divider}
								/>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CodeChefHelper;
