import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true && auth.user.role ==='admin' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, null)(AdminRoute);
