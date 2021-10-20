import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../actions/profileActions";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../validators/isEmpty";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    codechef: "",
    leetcode: "",
    errors: {},
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      codechef: this.state.codechef,
      leetcode: this.state.leetcode,
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.coding = !isEmpty(profile.coding) ? profile.coding : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.codechef = !isEmpty(profile.coding.codechef)
        ? profile.coding.codechef
        : "";
      profile.leetcode = !isEmpty(profile.coding.leetcode)
        ? profile.coding.leetcode
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
        codechef : profile.codechef,
        leetcode: profile.leetcode,
      });
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="codechef username"
            name="codechef"
            icon="fas fa-code"
            value={this.state.codechef}
            error={errors.codechef}
            onChangeHandler={this.onChangeHandler}
          />
          <InputGroup
            placeholder="leetcode username"
            name="leetcode"
            icon="fas fa-code"
            value={this.state.leetcode}
            error={errors.leetcode}
            onChangeHandler={this.onChangeHandler}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            error={errors.twitter}
            onChangeHandler={this.onChangeHandler}
          />

          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            error={errors.facebook}
            onChangeHandler={this.onChangeHandler}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            error={errors.linkedin}
            onChangeHandler={this.onChangeHandler}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            error={errors.youtube}
            onChangeHandler={this.onChangeHandler}
          />

          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            error={errors.instagram}
            onChangeHandler={this.onChangeHandler}
          />
        </div>
      );
    }

    const options = [
      { label: "*Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Jr Developer", value: "Jr Developer" },
      { label: "Intern", value: "Intern" },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4">Edit Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile
              </p>
              <small className="d-block pb-3"> * = Required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.handle}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.status}
                  options={options}
                  info="to get an idea "
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.company}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.website}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />
                <TextFieldGroup
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.location}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />
                <TextFieldGroup
                  placeholder="skills"
                  name="skills"
                  value={this.state.skills}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.skills}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <TextFieldGroup
                  placeholder="githubusername"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.githubusername}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChangeHandler={this.onChangeHandler}
                  error={errors.bio}
                  info="A unique handle for your profile URL, Your full name ,company name, nickname"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="submit"
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

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
