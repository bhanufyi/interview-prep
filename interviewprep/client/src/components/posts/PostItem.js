import React, { Component } from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { Link} from 'react-router-dom';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import {deletePost,addLike,removeLike} from '../actions/postActions';
import  classes from './PostItem.module.css';

class PostItem extends Component {

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

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onUnLikeClick = (id) => {
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
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
          <div className="col-md-12">
            <div style={styles}>
              <div class={classes.Container} ref={this.nodeRef} dangerouslySetInnerHTML={{ __html: post.text }} />
            </div>

            {showActions ? (
              <span>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View Full Post
                </Link>
                <button
                  type="button"
                  onClick={() => this.onLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  ></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => this.onUnLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={(e) => this.onClickDelete(e, post._id)}
                    className="btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
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
              <div ref={this.nodeRef} dangerouslySetInnerHTML={{ __html: post.text }} />
            </div>

            {showActions ? (
              <span>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View Full Post
                </Link>
                <button
                  type="button"
                  onClick={() => this.onLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  ></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => this.onUnLikeClick(post._id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={(e) => this.onClickDelete(e, post._id)}
                    className="btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


PostItem.defaultProps = {
  showActions: true,
  styles: { height: 150, overflowY: "scroll", marginTop: 10 },
  fullpage:false,
};

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{deletePost,addLike,removeLike})(PostItem);