import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, theme } from '@material-ui/core/styles';
import {Link,Typography} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { getUsers } from '../../actions/users';

import { login } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import AlertMessage from '../../common/AlertMessage'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    },
    link: {
      marginLeft: theme.spacing(1)
    }
  })
);


const Login = (getState) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatusBase] = useState("");
  

  const handleChangeEmail = (e) => {
    if(e.target.value.length !== 0){
      setEmail(e.target.value);
      setErrors({...errors,email:""});
    }
    else{
      setErrors({...errors,email:"Email is required"});
    }

  };
  const handleChangePassword = (e) => {
    if(e.target.value.length !== 0){
      setPassword(e.target.value)
      setErrors({...errors,password:""})
    }
    else
    {
      setErrors({...errors,password:"Password is required"});
    }
  };

  // This is one way to do this defining a object with email and password props and keeping one common change function and setting th
  // values of all those props like [e.target.name] : e.target.value

  // const change = e =>{
  //   if(e.target.value.length !== 0){
  //     setPassword(e.target.value)
  //     setErrors({...errors,password:""})
  //   }
  //   else
  //   {
  //     setErrors({...errors,password:"Password is required"});
  //   }
  // }
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authUser = useSelector((state)=>state.auth.user);
  const error = useSelector((state)=>state.error.msg);
  const history = useHistory();

  useEffect(()=>{
    if(isAuthenticated) {
      history.push(`/`);
      const userid = authUser.user.id;
      dispatch(getPosts());
      dispatch(getUsers(getState));
      
    }
  },[isAuthenticated])

  useEffect(()=>{
    if(error?.msg){
      setStatusBase({ msg: error?.msg, key: Math.random() });
      //setMsg("");
    }
  },[error]); 

  const handleLogin = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(errors).some(x => (x !== null && x !== ""));
    //console.log(isEmpty);
    if(!isEmpty){
    const user = { email, password };
    dispatch(login(user));
    // Attempt to login
    }
    
  };

 
  return (
    <>
    <form name="loginform" className={classes.container} noValidate autoComplete="off" onSubmit={handleLogin}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login to your Memories!!" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              margin="normal"
              onChange={handleChangeEmail}
              error ={Boolean(errors?.email)}
              helperText={errors?.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              margin="normal"
              onChange={handleChangePassword}
              error ={Boolean(errors?.password)}
              helperText={errors?.password}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit"
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}>
            Login
          </Button>
        </CardActions>
        <Typography variant="subtitle2" className={classes.link}>Need a new account, <Link href="/register">sign up</Link></Typography>
      </Card>
    </form>
    {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
    </>
  );
}

export default Login;