import React, { useState, useEffect } from 'react';
import { Container, Typography,AppBar, Grow, Grid,Toolbar,Box } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts,getPostsByUser } from './actions/posts';
import { getUsers } from './actions/users';
import useStyles from './styles';
import memories from './images/memories.png';

import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import { Logout } from './components/Login/Logout';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
// import AppBar from './common/AppBar'


const App = (getState) => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.users);
  const [option,setSelectedoption] = useState({});
  const [titleText,setTitleText] = useState(''); 
  const [otherUserProfile,setOtherUserProfile] = useState(false); 
  
  useEffect(() => {
    dispatch(getPosts(getState));
  }, [currentId, dispatch]);

  useEffect(()=>{dispatch(getUsers(getState));},[])
  useEffect(()=>{if(!users) users=users},[users])

  useEffect(() => {
    if(option!=null){
      setTitleText(option.name);
      dispatch(getPostsByUser(option._id,getState));  
    }
  },[option])
  
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          {otherUserProfile && <HomeIcon  onClick={()=>{setOtherUserProfile(false); dispatch(getPosts(getState));}} className={classes.menuButton}></HomeIcon>}
          <Typography className={classes.title} variant="h6" noWrap>
            {!otherUserProfile && <a>My Memories</a>}
            {otherUserProfile && <a>{titleText}'s Memories</a>}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
            id="free-solo-demo"
            style={{width:300}}
            freeSolo
            options={users}
            getOptionLabel={option => option.name}
            onChange={(event, value) => {setSelectedoption(value);setOtherUserProfile(true);}} 
            renderInput={(params) => (
            <TextField {...params} 
              classes={{
                root: classes.inputRoot
              }}
            />
            )}
            />

            {/* <AppBar users={users} setSelectedoption={setSelectedoption} setOtherUserProfile={setOtherUserProfile}></AppBar> */}
          </div>
          <div>
          {token ? <Logout className={classes.menuButton}></Logout> : null}
      </div>
        </Toolbar>
      </AppBar>
    </div>
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            {!otherUserProfile && <Form currentId={currentId} setCurrentId={setCurrentId} />}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>);
  }

};



export default App;