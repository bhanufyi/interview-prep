import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/adminActions";
import  PostFeed from "./AdminPostFeed";

class Admin extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts} = this.props.admin;

    let postContent;

    if (posts === null) {
      postContent = <h4>Loading....</h4>;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="col-md-12">{postContent}</div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  admin: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { getPosts })(Admin);
