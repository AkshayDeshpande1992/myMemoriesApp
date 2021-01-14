import { GET_USERS } from '../constants/actionTypes';
import * as api from '../api';

  export const getUsers = () => async(dispatch,getState) => {
    try {
        const {data} = await api.FetchUsers(tokenConfig(getState));
        const action = {type:GET_USERS,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

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