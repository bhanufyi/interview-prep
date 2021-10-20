import {ADD_POST,GET_POSTS,POST_LOADING, DELETE_POST,GET_POST,CONTEST} from '../actions/types';
const initialState = {
    posts:[],
    post : {},
    loading: false,
    contest :{},
}


const postReducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_POST : return {
            ...state,
            posts: [action.payload,...state.posts],
            loading:false,
        };
        case GET_POST : return {
            ...state,
            post: action.payload,
            loading:false,
        }
        case POST_LOADING: return{
            ...state,
            loading: true,
        };
        case GET_POSTS: return {
            ...state,
            posts : action.payload,
            loading:false,
        };
        case DELETE_POST : return {
            ...state,
            posts:state.posts.filter(post => post._id !== action.payload),
        }

        case CONTEST : return {
            ...state,
            contest : action.payload,
        }
        default : return state;
    }
}

export default postReducer;