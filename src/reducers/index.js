import { combineReducers } from 'redux'
import posts from './posts'
import error from './error'
import auth from './auth'

export default combineReducers({
    posts,error,auth
})