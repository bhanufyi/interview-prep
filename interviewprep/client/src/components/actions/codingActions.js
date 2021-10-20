import axios from 'axios';
import {FETCH_CODECHEF,FETCH_LEETCODE,GET_ERRORS} from './types';


export const fetchCodeChef = ()=> dispatch =>{
    axios.get("/api/codingstats/codechef",)
        .then(res=> {
          return dispatch({
            type: FETCH_CODECHEF,
            payload:res.data,
        })


        })
        .catch(err=> 
          { 
            
            return dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
             })
          }
      )
}

export const fetchLeetCode = () => (dispatch) => {
  axios
    .get("/api/codingstats/leetcode")
    .then((res) =>
      dispatch({
        type: FETCH_LEETCODE,
        payload: res.data,
      })
    )
    .catch((err) =>{
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    });
};