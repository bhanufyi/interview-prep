import React, { Component } from "react";
import { connect } from "react-redux";
import { getContests } from "../actions/postActions";
import moment from "moment-timezone";

class Contest extends Component {
	state = {
		contest: {},
	};
	componentDidMount() {
		this.props.getContests();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.post.contest) {
			this.setState({ contest: nextProps.post.contest });
		}
	}

	render() {
		let content = <h4>Loading</h4>;
		const format = "YYYY-MM-DDTHH:mm";
		if (
			this.props.post.contest &&
			Object.keys(this.props.post.contest).length !== 0
		) {
			content = this.props.post.contest.objects.map((con) => (
				<div className="col-md-3 col-sm-6 col-xs-12">
					<div
						className="card-body rounded"
						style={{ width: "100%", height: "100%" }}
					>
						<div className="d-flex flex-column ">
							<div
								className="d-flex flex-row align-items-center justify-content-start"
								style={{ wordWrap: "break-word" }}
							>
								<img
									src={`http://clist.by${con.resource.icon}`}
									alt=""
									style={{
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										objectFit: "cover",
										marginRight: "5px",
									}}
								/>
								<h4 className="ml-2">{con.resource.name}</h4>
							</div>

							<h5>Event : {con.event}</h5>
							<h6>
								Start :
								{moment
									.utc(con.start)
									.tz(
										Intl.DateTimeFormat().resolvedOptions()
											.timeZone
									)
									.format(format)}
							</h6>
							<h6>
								End :
								{moment
									.utc(con.end)
									.tz(
										Intl.DateTimeFormat().resolvedOptions()
											.timeZone
									)
									.format(format)}
							</h6>
							<a
								href={con.href}
								rel="noreferrer noopener"
								target="_blank"
							>
								<i class="fas fa-external-link-square-alt">
									Contest Link
								</i>
							</a>
						</div>
					</div>
				</div>
			));
		}
		return (
			<div className="container center">
				<div>
					<h3>
						{moment
							.utc(new Date().getTime())
							.tz(
								Intl.DateTimeFormat().resolvedOptions().timeZone
							)
							.format(format)}
					</h3>
				</div>
				<div className="row" style={{ boxSizing: "border-box" }}>
					{content}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getContests })(Contest);
