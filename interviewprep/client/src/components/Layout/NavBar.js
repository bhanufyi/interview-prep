import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

import { Menu } from "@material-ui/icons";
import { useNavBarContext } from "../hooks/useNavBarContext";


const  NavBar  = (props)=> {
 const onLogoutClick = (e) => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser();
  };

  const { isAuthenticated, user } = props.auth;
  const {handleOpen} = useNavBarContext();
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            rel="noreferrer noopener"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            More
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/dashboard">
              Dashboard
            </Link>
            <Link className="dropdown-item" to="/feed">
              Feed
            </Link>
            <Link className="dropdown-item" to="/createpost">
              Post
            </Link>
            <div class="dropdown-divider"></div>
            <Link className="dropdown-item" to="/contest">
              Contests
            </Link>
            <Link className="dropdown-item" to="/coding/codechef">
              CodeChef
            </Link>
            <Link className="dropdown-item" to="/coding/leetcode">
              LeetCode
            </Link>
            <div class="dropdown-divider"></div>
            {user.role === "admin" ? (
              <Link className="dropdown-item" to="/admin">
                AdminView
              </Link>
            ) : null}
          </div>
        </li>
        <li className="nav-item">
          <a
            href="#"
            rel="noopener noreferrer"
            onClick={onLogoutClick}
            className="nav-link"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to you email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Menu style={{ color: 'white',cursor:"pointer" }} onClick={handleOpen}/>
          <Link className="navbar-brand" to="/">
            InterviewPrep
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Peers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );

}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  NavBar
);
