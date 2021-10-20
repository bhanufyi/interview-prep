import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import { addPost } from "../actions/postActions";
import QuillEditor from '../editor/QuillEditor';

import classnames from 'classnames';

class PostForm extends Component {
  state = {
    text: "",
    files: [],
    errors: {},
  };

  
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addPost(newPost, this.props.history);
    this.setState({ text: "" });
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEditorChange = (value) => {
    this.setState({ text: value });
  };

  onFilesChange = (files) => {
    this.setState({ files: files });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <h1 className="text-center">Editor</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <QuillEditor
              
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.text,
              })}
              placeholder={"Write something awesome"}
              onEditorChange={this.onEditorChange}
              onFilesChange={this.onFilesChange}
            />
            {errors.text && (
              <div className="invalid-feedback">{errors.text}</div>
            )}
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { addPost })(withRouter(PostForm));
