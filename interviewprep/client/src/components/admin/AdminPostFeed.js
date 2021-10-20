import React, { Component } from "react";
import AdminPostItem from "./AdminPostItem";

class AdminPostFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map((post) => <AdminPostItem key={post._id} post={post} />);
  }
}

export default AdminPostFeed;
