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

import { login } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import { getPosts } from '../../actions/posts';

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


const Login = (error) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authUser = useSelector((state)=>state.auth.user);
  const history = useHistory();

  useEffect(()=>{
    if(isAuthenticated) {
      history.push(`/`);
      const userid = authUser.user.id;
      dispatch(getPosts())
    }
  },[isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault();

    const user = { email, password };

    // Attempt to login
    dispatch(login(user));
    
  };

 
  return (
    <form className={classes.container} noValidate autoComplete="off">
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
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              margin="normal"
              onChange={handleChangePassword}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            >
            Login
          </Button>
        </CardActions>
        <Typography variant="subtitle2" className={classes.link}>Need a new account, <Link href="/register">sign up</Link></Typography>
      </Card>
    </form>
  );
}

export default Login;