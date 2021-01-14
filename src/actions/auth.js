import { USER_LOADED,USER_LOADING,REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS,AUTH_ERROR } from '../constants/actionTypes';
import { getUser,loginfn,registerfn } from '../api/index'
import {returnErrors,clearErrors} from './errors'

export const loadUser = () => (dispatch,getState) => {
    
    dispatch({type: USER_LOADING});
    
    // auth reducer, from initial_state variable's token property
   

    getUser(tokenConfig(getState)).
          then(res=>{if(res) dispatch({type: USER_LOADED,payload:res.data})}).catch(err => { if(err){
        dispatch(returnErrors(err.response.data,err.response.status));
        dispatch({type:AUTH_ERROR})}
    })
}

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ name, email, password });
  
    registerfn(body,config).then(res =>{
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: REGISTER_FAIL
        });
      });
  };
  
  // Login User
export const login = ({ email, password }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ email, password });
  
    //axios.post('http://localhost:5000/users/login', body, config)
    loginfn(body,config).then(res =>{
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        dispatch(clearErrors())
      }
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        // dispatch({
        //   type: LOGIN_FAIL
        // });
      });
  };

export const logout = (dispatch) => {
  dispatch({
      type: LOGOUT_SUCCESS
    });
  };


export const tokenConfig = getState => {
    const token = getState().auth.token; 

    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }

    if(token){
        config.headers['x-auth-token']=token;
    }

    return config;
}