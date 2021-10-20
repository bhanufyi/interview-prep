import { FETCH_CODECHEF,FETCH_LEETCODE } from "../actions/types";

const initialState = { codechef: null,
                        leetcode:null,
                     };

const codingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CODECHEF:
      return {
        ...state,
        codechef: action.payload,
      };

    case FETCH_LEETCODE:
        return {
            ...state,
            leetcode: action.payload
        }

    default:
      return state;
  }
};

export default codingReducer;
