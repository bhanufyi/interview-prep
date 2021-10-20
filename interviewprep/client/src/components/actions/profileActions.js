import axios from 'axios';
import {GET_PROFILE,GET_PROFILES, PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS,} from './types';
import {logoutUser} from './authActions';

const config = {
  withCredentials: true,
}
export const getCurrentProfile = () => dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile',config)
        .then(res=>
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
            )
            .catch(err=>{
                if(err.response.data){
                    
                }
                dispatch({
                type:GET_PROFILE,
                payload:{},
            })})
}



export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all",config)
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`,config)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};




export const createProfile = (profileData,history) => dispatch =>{
    axios.post('/api/profile',profileData,config)
        .then(res=>history.push('/dashboard'))
        .catch(err=> dispatch({
            type:GET_ERRORS,
            payload : err.response.data,
        }))
}

const setProfileLoading = ()=>{
    return {
        type: PROFILE_LOADING,
    }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};


export const deleteAccount = ()=> dispatch =>{
    if(window.confirm('This Action cannot be undone. Are your')){
        axios.delete('/api/profile',config)
        .then(res=> dispatch({
            type: CLEAR_CURRENT_PROFILE,
        })).then(res=> dispatch(logoutUser()))
            .catch(err=>dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }))
    }
}

export const addExperience = (expData,history)=>dispatch =>{
    axios.post('/api/profile/experience',expData,config)
        .then(res=>history.push('/dashboard'))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data,
        }))
}

export const deleteExperience = (id)=>dispatch =>{

    axios
      .delete(`/api/profile/experience/${id}`,config)
      .then((res) => dispatch({
          type:GET_PROFILE,
          payload: res.data,
      }))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );

}

export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", eduData,config)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};


export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`,config)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
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


