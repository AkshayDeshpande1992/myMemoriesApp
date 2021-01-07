import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from 'react-redux';

export const AuthRoute = props => {
  const token = useSelector((state) => state.auth.token);
  return <Route render={props =>
    token ? (
      <Route {...props} />
    ) : (
      <Redirect to="/login" />
    )} /> 
};
