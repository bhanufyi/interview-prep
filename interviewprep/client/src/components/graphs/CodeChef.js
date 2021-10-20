import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchCodeChef } from "../actions/codingActions";
import CodeChefHelper from "./CodeChefHelper";

class CodeChef extends Component {
  state = {
    codechef: {},
  };
  componentDidMount() {
    this.props.fetchCodeChef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coding.codechef) {
      console.log(nextProps.coding.codechef);
      this.setState({ codechef: nextProps.coding.codechef });
    }
  }

  render() {

    console.log(this.props.coding);
    const { codechef } = this.props.coding;
    
    let codechefContent;

    if (codechef === null) {
      codechefContent = <h1>Loading....</h1>;
    } else {
      codechefContent = (
    
              <CodeChefHelper codechef={codechef} />
          
      );
    }

    return codechefContent;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  coding: state.coding,
});
export default connect(mapStateToProps, { fetchCodeChef })(
  withRouter(CodeChef)
);
