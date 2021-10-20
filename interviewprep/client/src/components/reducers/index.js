import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import toastReducer from './toastReducer';
import  codingReducer from './codingReducer';


export default combineReducers({
    auth:authReducer,
    errors: errorReducer,
    profile:profileReducer,
    post: postReducer,
    toast: toastReducer,
    admin : adminReducer,
    coding: codingReducer,
})