import { TOAST_MESSAGE } from "../actions/types";

const initialState = {message:''};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
      case TOAST_MESSAGE: return {
          ...state,
          message: action.payload,
      }
    
    default:
      return state;
  }
};

export default toastReducer;
