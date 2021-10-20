import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    POST_LOADING,
    GET_POSTS,
    DELETE_POST,
    GET_POST,
    CLEAR_ERRORS,
    CONTEST
} from './types';


export const addPost = (postData,history) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts',postData)
        .then(res=>{
            dispatch({
                type:ADD_POST,
                payload: res.data,
            });
          })
            .catch(err=> dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            }));

            setTimeout(()=>history.push('/feed'),2000);
            
}

export const deletePost = (postid) => (dispatch) => {
  axios
    .delete(`/api/posts/${postid}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
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


export const addLike = id  => dispatch =>{
    axios.post(`/api/posts/like/${id}`)
    .then(res=> dispatch(getPosts()))
    .catch(err=> dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
    }))
}


export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};



export const getPosts = () => (dispatch) => {
    dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
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

export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>{
     console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
    );
};


export const setPostLoading = ()=>dispatch =>{
    return {
        type:POST_LOADING,   
    }
}

export const clearErrors = () => (dispatch) => {
  return {
    type: CLEAR_ERRORS,
  };
};


export const addComment = (postId,newComment) => (dispatch) => {
    dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, newComment)
    .then((res) =>
      dispatch({
        type: GET_POST,
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

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
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


export const getContests = ()=>dispatch =>{
  axios.get('/api/contest')
    .then(res=>dispatch({
      type:CONTEST,
      payload : res.data,
    }))
    .catch(err=>console.log(err));
}