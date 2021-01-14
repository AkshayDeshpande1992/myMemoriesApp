import { GET_USERS } from '../constants/actionTypes';

export default (users = [],action)=>{
    switch(action.type){
      case GET_USERS:
        return action.payload;
      default:
          return users;
    } 
}