import { ADMIN_POSTS,ADMIN_DELETE_POST } from "../actions/types";

const initialState = {posts:[]};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ADMIN_DELETE_POST : 
    return {
      ...state,
      posts: state.posts.filter((post) => post._id !== action.payload),
    };

    default:
      return state;
  }
};

export default adminReducer;
