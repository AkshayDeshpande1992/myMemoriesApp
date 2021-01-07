import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid,Toolbar,Box } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import { loadUser } from './actions/auth'
import useStyles from './styles';
import memories from './images/memories.png';

import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { Logout } from './components/Login/Logout';


const App = (getState) => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getPosts(getState));
  }, [currentId, dispatch]);

 
  return(
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/" component={Homepage}  />
      </Switch>
    </Router>
  );

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );
  }

  function Homepage(){
    return(<Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
      <img className={classes.image} src={memories} alt="icon" height="60" />
      <Toolbar>
        {token ? <Logout></Logout> : null}
      </Toolbar>
    </AppBar>
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>);
  }

};



export default App;