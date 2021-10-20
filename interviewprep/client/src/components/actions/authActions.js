import { GET_ERRORS, SET_CURRENT_USER,TOAST_MESSAGE } from "./types";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import {toast} from 'react-toastify';



export const registerUser = (userData,history) => (dispatch) => {
  axios
    .post("/api/users/register", userData,{withCredentials:true})
    .then((res) => {
      toast.success(res.data.message);
      dispatch({
        type: TOAST_MESSAGE,
        payload : res.data.message
      })
      history.push('/login')})
    .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }));
  
};

export const loginUser = (userData) => dispatch =>{
  axios
    .post("/api/users/login", userData,{withCredentials:true})
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}





export const setCurrentUser = (decoded) => {
  return {
    type:SET_CURRENT_USER,
    payload: decoded
  }
}


export const logoutUser = () => dispatch =>{
  localStorage.removeItem('jwtToken');

  setAuthToken(false);

  dispatch(setCurrentUser({}))
}
