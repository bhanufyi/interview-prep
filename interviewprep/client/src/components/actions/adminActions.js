import {ADMIN_POSTS,GET_ERRORS,ADMIN_DELETE_POST} from './types';
import axios from "axios";
import { toast } from "react-toastify";


export const getPosts = () => (dispatch) => {
  
  axios
    .get("/api/admin/posts/adminview/all")
    .then((res) =>
      dispatch({
        type: ADMIN_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};


export const deletePost = (postid) => (dispatch) => {
  axios
    .delete(`/api/admin/deletepost/${postid}`)
    .then((res) =>
      dispatch({
        type: ADMIN_DELETE_POST,
        payload: postid,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};