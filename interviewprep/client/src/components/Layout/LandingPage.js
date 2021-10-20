import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';



 class LandingPage extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12  text-center">
                <h1 className="display-3 mb-4">InterviewPrep</h1>
                <p className="lead">
                  Collaborate with others to get yourself prepared for the D Day
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state=>({
  auth:state.auth,
});

export default connect(mapStateToProps,null)(LandingPage) ;

