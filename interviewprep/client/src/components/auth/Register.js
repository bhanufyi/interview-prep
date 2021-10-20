import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {registerUser} from '../actions/authActions';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your InterviewPrep account
              </p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="password2"
                  type="password"
                  placeholder="confirm password"
                  value={this.state.password2}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
  auth : state.auth,
  errors : state.errors
})


export default  connect(mapStateToProps,{registerUser})(withRouter(Register));
