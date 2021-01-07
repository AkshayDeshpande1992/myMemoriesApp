import axios from 'axios';

const url = 'https://memoriees-app.herokuapp.com';


export const FetchPosts = (config) => axios.get(url+"/posts",config);
export const createPost = (newPost,config) => axios.post(url+"/posts",newPost,config);
export const updatePost = (id,updatedPost,config) => axios.patch(`${url}/posts/${id}`,updatedPost,config);
export const deletePost = (id,config) => axios.delete(`${url}/posts/${id}`,config);
export const likePost = (id,config) => axios.patch(`${url}/posts/${id}/likePost`,config);


export const getUser = (config) => axios.get(url+"/users/getUserByToken",config);
export const loginfn = (body,config) => axios.post(`${url}/users/login`, body, config);