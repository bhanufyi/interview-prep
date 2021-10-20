import {
	Backdrop,
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
	Collapse,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavBarContext } from "../hooks/useNavBarContext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import {
	AccountCircleRounded,
	AddCircleRounded,
	CodeRounded,
	Dashboard,
	DynamicFeedRounded,
	PostAddRounded,
} from "@material-ui/icons";

const useStyles = (props) => {
	return makeStyles((theme) => ({
		root: {
			height: "100vh",
			width: "250px",
			padding: "20px 5px",
			top: 0,
			left: 0,
			position: "fixed",
			transform: `translateX(${props.sideBarOpen ? "0px" : "-250px"})`,
			transition: "transform .4s ease-in-out",
			zIndex: theme.zIndex.drawer,
			backgroundColor: "white",
		},
		paper: {
			width: "100%",
			height: "100%",
		},
		backdrop: {
			zIndex: theme.zIndex.drawer - 1,
			color: "#fff",
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	}));
};

const Sidebar = (props) => {
	const { open, handleClose } = useNavBarContext();
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const styleProps = { sideBarOpen };
	const classes = useStyles(styleProps)();

	const [listOpen, setListOpen] = useState(false);

	const handleListCollapse = () => {
		setListOpen(!listOpen);
	};

	useEffect(() => {
		setSideBarOpen(open);
	}, [open]);

	const AuthSideBar = () => {
		return (
			<List component="ul">
				<Link to="/dashboard" className="link">
					<ListItem button component="li">
						<ListItemIcon>
							<Dashboard />
						</ListItemIcon>
						<ListItemText primary="DashBoard" />
					</ListItem>
				</Link>
				<Link to="/feed" className="link">
					<ListItem button component="li">
						<ListItemIcon>
							<DynamicFeedRounded />
						</ListItemIcon>
						<ListItemText primary="Feed" />
					</ListItem>
				</Link>
				<Link to="/createpost" className="link">
					<ListItem button component="li">
						<ListItemIcon>
							<PostAddRounded />
						</ListItemIcon>
						<ListItemText primary="Post" />
					</ListItem>
				</Link>
				<Link to="/contest" className="link">
					<ListItem button component="li">
						<ListItemIcon>
							<CodeRounded />
						</ListItemIcon>
						<ListItemText primary="Contests" />
					</ListItem>
				</Link>
				<Divider />
				<ListItem button onClick={handleListCollapse}>
					<ListItemText primary="Coding" />
				</ListItem>
				<Collapse in={listOpen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Link to="/coding/codechef" className="link">
							<ListItem
								button
								component="li"
								className={classes.nested}
							>
								<ListItemIcon inset>
									<AddCircleRounded />
								</ListItemIcon>
								<ListItemText primary="codechef" />
							</ListItem>
						</Link>
						<Link to="/coding/leetcode" className="link">
							<ListItem
								button
								component="li"
								className={classes.nested}
							>
								<ListItemIcon inset>
									<AddCircleRounded />
								</ListItemIcon>
								<ListItemText primary="leetcode" />
							</ListItem>
						</Link>
					</List>
				</Collapse>
				<Divider />
				<ListItem
					button
					onClick={(e) => {
						console.log("whats this");
						e.preventDefault();
						props.clearCurrentProfile();
						props.logoutUser();
					}}
				>
					<ListItemIcon>
						<AccountCircleRounded />
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</ListItem>
			</List>
		);
	};

	const { isAuthenticated } = props.auth;

	const listItems = isAuthenticated ? (
		<AuthSideBar  />
	) : (
		<List component="ul" className={classes.list}>
			<Link to="/login" className="link">
				<ListItem button component="li">
					<ListItemText primary="Login" />
				</ListItem>
			</Link>
			<Link to="/register" className="link">
				<ListItem button component="li">
					<Typography>SignUp</Typography>
				</ListItem>
			</Link>
		</List>
	);

	return (
		<>
			<Backdrop
				className={classes.backdrop}
				open={open}
				onClick={handleClose}
			/>

			<Box className={classes.root}>
				<Paper className={classes.paper} square={true} elevation={0}>
					<Box display="flex" flexDirection="column">
						<Box>
							<Typography
								variant="h4"
								style={{ cursor: "pointer" }}
							>
								InterviewPrep
							</Typography>
						</Box>
						<Box display="flex" flexDirection="column">
							{listItems}
						</Box>
					</Box>
				</Paper>
			</Box>
		</>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
	Sidebar
);
