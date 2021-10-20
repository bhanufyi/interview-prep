import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchLeetCode } from "../actions/codingActions";
import LeetCodeHelper from './LeetCodeHelper';

class LeetCode extends Component {
  state = {
    leetcode: {},
  };
  componentDidMount() {
    this.props.fetchLeetCode();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coding.leetcode) {
      console.log(nextProps.coding.leetcode);
      this.setState({ leetcode: nextProps.coding.leetcode });
    }
  }

  render() {
    console.log(this.props.coding);
    const { leetcode } = this.props.coding;
    let leetcodeContent;

    if (leetcode === null) {
      leetcodeContent = <h1>Loading....</h1>;
    } else {
      leetcodeContent = (
        
            <LeetCodeHelper leetcode={leetcode} />
          
      );
    }

    return <div className="container">{leetcodeContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  coding: state.coding,
});
export default connect(mapStateToProps, { fetchLeetCode })(
  withRouter(LeetCode)
);
