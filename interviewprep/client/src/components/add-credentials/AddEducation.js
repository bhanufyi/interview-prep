import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false,
  };
  onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    this.props.addEducation(eduData, this.props.history);
    
  };

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center"> Add your area study</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="school"
                  name="school"
                  value={this.state.school}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.school}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <TextFieldGroup
                  placeholder="* degree"
                  name="degree"
                  value={this.state.degree}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.degree}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <TextFieldGroup
                  placeholder="* fieldofstudy"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.fieldofstudy}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.to}
                  disabled={this.state.disabled ? true : false}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                    className="form-check-input"
                  />
                  <label htmlFor="current" className="form-check-label">
                    current job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="description"
                  name="description"
                  value={this.state.description}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.description}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />
                <input
                  type="submit"
                  value="Submit"
                  onSubmit={this.onSubmit}
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);

