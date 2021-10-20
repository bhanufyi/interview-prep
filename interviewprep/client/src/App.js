import "./App.css";
import React,{useState} from 'react';
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import LandingPage from "./components/Layout/LandingPage";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Activate from './components/auth/Activate';


import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";


import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./components/actions/authActions";

import Admin from './components/admin/Admin';
import AdminRoute from './components/common/AdminRoute';


import DashBoard from "./components/dashboard/DashBoard";
import { clearCurrentProfile } from "./components/actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from "./components/not-found/NotFound";
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PostForm from "./components/posts/PostForm";
import Contest from "./components/Contests/Contest";
import LeetCode from "./components/graphs/LeetCode";
import CodeChef from "./components/graphs/CodeChef";
import Sidebar from "./components/Layout/Sidebar";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decode = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decode));

  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
		<Provider store={store}>
			<Router>
				<div
					className="App d-flex flex-column"
					style={{ minHeight: "100vh" }}
				>
					<NavBar />
					<ToastContainer />
					<Sidebar />

					<Switch>
						<Route exact path="/" component={LandingPage} />

						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profiles" component={Profiles} />
						<Route
							exact
							path="/auth/activate/:token"
							component={Activate}
						/>
						<Route
							exact
							path="/auth/password/forgot"
							component={Forgot}
						/>
						<Route
							exact
							path="/auth/password/reset/:token"
							component={Reset}
						/>
						<Route
							exact
							path="/profile/:handle"
							component={Profile}
						/>
						<PrivateRoute
							exact
							path="/dashboard"
							component={DashBoard}
						/>
						<PrivateRoute
							exact
							path="/create-profile"
							component={CreateProfile}
						/>
						<PrivateRoute
							exact
							path="/edit-profile"
							component={EditProfile}
						/>
						<PrivateRoute
							exact
							path="/add-experience"
							component={AddExperience}
						/>
						<PrivateRoute
							exact
							path="/add-education"
							component={AddEducation}
						/>
						<PrivateRoute exact path="/feed" component={Posts} />
						<PrivateRoute
							exact
							path="/createpost"
							component={PostForm}
						/>
						<PrivateRoute exact path="/post/:id" component={Post} />
						<PrivateRoute
							exact
							path="/contest"
							component={Contest}
						/>
						<PrivateRoute
							exact
							path="/coding/codechef"
							component={CodeChef}
						/>
						<PrivateRoute
							exact
							path="/coding/leetcode"
							component={LeetCode}
						/>
						<AdminRoute exact path="/admin" component={Admin} />
				  	<Route path="/" component={NotFound} />
					</Switch>

					<Footer />
				</div>
			</Router>
		</Provider>
  );
}

export default App;
