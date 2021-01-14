import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,FETCH_BY_USER } from '../constants/actionTypes';
import {tokenConfig} from './auth'


export const getPosts = () => async(dispatch,getState) => {
    try {
        const {data} = await api.FetchPosts(tokenConfig(getState));
        const action = {type:FETCH_ALL,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsByUser = (id) => async(dispatch,getState) => {
  try {
      const {data} = await api.FetchPostsByUser(id,tokenConfig(getState));
      const action = {type:FETCH_BY_USER,payload:data};
      dispatch(action);
  } catch (error) {
      console.log(error.message);
  }
}

export const createPost = (post) => async(dispatch,getState) => {
    try {
        const {data} = await api.createPost(post,tokenConfig(getState));
        const action = {type:CREATE,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id,post) => async(dispatch,getState) => {
    try {
        const {data} = await api.updatePost(id,post,tokenConfig(getState));
        const action = {type:UPDATE,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch,getState) => {
    try {
      const { data } = await api.likePost(id,tokenConfig(getState));
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const deletePost = (id) => async (dispatch,getState) => {
    try {
      await await api.deletePost(id,tokenConfig(getState));
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };