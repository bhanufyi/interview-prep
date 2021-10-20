import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link} from 'react-router-dom';

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newUser);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("./dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your InterviewPrep account
              </p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.email}
                />

                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.password}
                />
                <Link
                  to="/auth/password/forgot"
                  className="text-danger d-flex flex-row justify-content-end"
                >
                  Forgot Password
                </Link>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
