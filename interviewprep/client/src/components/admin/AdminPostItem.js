import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { deletePost } from "../actions/adminActions";

class AdminPostItem extends Component {
  nodeRef = React.createRef();
  componentDidMount() {
    hljs.registerLanguage("javascript", javascript);

    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }

  highlight = () => {
    if (this.nodeRef) {
      const nodes = this.nodeRef.current.querySelectorAll("pre");
      nodes.forEach((node) => {
        hljs.highlightBlock(node);
      });
    }
  };

  onClickDelete = (e, id) => {
    this.props.deletePost(id);
  };

  render() {
    const { post, auth, showActions, styles, fullpage } = this.props;
    return fullpage ? (
      <div className="card card-body shadow-lg mb-3">
        <div className="d-flex flex-row">
          <a href="/profile">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              style={{ width: "30px" }}
              alt=""
            />
          </a>
          <br />
          <p className=" ml-2 text-center">{post.name}</p>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <div style={styles}>
              <div
                ref={this.nodeRef}
                dangerouslySetInnerHTML={{ __html: post.text }}
              />
            </div>

            {showActions ? (
              <span>
                  <button
                    type="button"
                    onClick={(e) => this.onClickDelete(e, post._id)}
                    className="btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    ) : (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <div style={styles}>
              <div
                ref={this.nodeRef}
                dangerouslySetInnerHTML={{ __html: post.text }}
              />
            </div>

            {showActions ? (
              <span>
                  <button
                    type="button"
                    onClick={(e) => this.onClickDelete(e, post._id)}
                    className="btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

AdminPostItem.defaultProps = {
  showActions: true,
  styles: { height: 150, overflowY: "scroll", marginTop: 10 },
  fullpage: false,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost})(
  AdminPostItem
);
