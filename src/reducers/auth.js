import { USER_LOADED,USER_LOADING,REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS,AUTH_ERROR } from '../constants/actionTypes';

const INITIAL_STATE={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
};

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOADING:
          return {
             ...state,
             isLoading:true
          };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
             };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
             };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false,
                user:null
             };
      default:
        return state;  
    }
}